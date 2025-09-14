import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAuth} from '../context/AuthContext';
import Button from '../components/Button';
import {colors, fonts, scale} from '../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation.interface';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = () => {
  const {user, logout} = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name}</Text>
      <Text style={styles.subtitle}>{user?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale.ms(20),
  },
  title: {
    fontSize: scale.font(26),
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    marginBottom: scale.mvs(6),
  },
  subtitle: {
    fontSize: scale.font(14),
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    marginBottom: scale.mvs(30),
  },
});

export default HomeScreen;
