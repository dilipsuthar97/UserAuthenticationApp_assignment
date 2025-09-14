import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageKeys } from '../config';
import { IAuthUser } from '../types/models/IAuthUser';

interface AuthContextValue {
  user: IAuthUser | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{status: boolean; error?: string}>;
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{status: boolean; error?: string}>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface StoredUser extends IAuthUser {
  password: string;
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Load persisted user
  useEffect(() => {
    (async () => {
      try {
        const savedUser = await AsyncStorage.getItem(storageKeys.user);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        // silently ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /**
   * Load all users from AsyncStorage
   */
  const loadAllUsers = useCallback(async (): Promise<StoredUser[]> => {
    try {
      const raw = await AsyncStorage.getItem(storageKeys.users);
      if (!raw) {
        return [];
      }
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }, []);

  /**
   * Persist users to AsyncStorage
   */
  const persistUsers = useCallback(async (users: StoredUser[]) => {
    await AsyncStorage.setItem(storageKeys.users, JSON.stringify(users));
  }, []);

  /**
   * Login a user
   */
  const login = useCallback<AuthContextValue['login']>(
    async (email, password) => {
      const users = await loadAllUsers();
      const found = users.find(
        u => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (!found || found.password !== password) {
        return {status: false, error: 'Incorrect credentials'};
      }
      const authUser: IAuthUser = {
        id: found.id,
        name: found.name,
        email: found.email,
      };
      setUser(authUser);
      await AsyncStorage.setItem(storageKeys.user, JSON.stringify(authUser));
      return {status: true};
    },
    [loadAllUsers],
  );

  /**
   * Signup a user
   */
  const signup = useCallback<AuthContextValue['signup']>(
    async (name, email, password) => {
      const users = await loadAllUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return {status: false, error: 'Email already registered'};
      }
      const newUser: StoredUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
      };
      const updated = [...users, newUser];
      await persistUsers(updated);
      const authUser: IAuthUser = {id: newUser.id, name, email};
      setUser(authUser);
      await AsyncStorage.setItem(storageKeys.user, JSON.stringify(authUser));
      return {status: true};
    },
    [loadAllUsers, persistUsers],
  );

  /**
   * Logout a user
   */
  const logout = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(storageKeys.user);
  }, []);

  const value = useMemo(
    () => ({user, loading, login, signup, logout}),
    [user, loading, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};

export default AuthContext;
