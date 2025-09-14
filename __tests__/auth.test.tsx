import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {AuthProvider} from '../src/context/AuthContext';
import LoginScreen from '../src/screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

describe('Auth Flow', () => {
  it('shows error for invalid email format', async () => {
    const Stack = createNativeStackNavigator();
    const {getByText, getByTestId} = render(
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );
    fireEvent.changeText(getByTestId('login-email'), 'invalid-email');
    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText(/invalid email/i)).toBeTruthy();
    });
  });
});
