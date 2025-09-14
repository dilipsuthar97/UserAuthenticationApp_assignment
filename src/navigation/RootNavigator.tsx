import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import {useAuth} from '../context/AuthContext';
import {RootStackParamList} from '../types/Navigation.interface';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerTitle: 'Home'}}
    />
  </Stack.Navigator>
);

const RootNavigator: React.FC = () => {
  const {user, loading} = useAuth();

  return (
    <NavigationContainer>
      {loading ? null : user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
