import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAuth} from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import {colors, fonts, scale} from '../theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as Yup from 'yup';
import {RootStackParamList} from '../types/Navigation.interface';
import {Formik} from 'formik';
import {Popup} from '../helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

// validation schema for login form
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Please enter email')
    .label('Email'),
  password: Yup.string()
    .matches(/\w*[a-z A-Z]\w*/, 'Password must have latters')
    .required('Please enter password')
    .min(6, 'Password must be at least 6 characters')
    .label('Password'),
});

const initialFormValues = {
  email: '',
  password: '',
};

export type FormValues = typeof initialFormValues;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {login} = useAuth();
  const [loading, setLoading] = useState(false);

  /**
   * Handle login button press
   * @param values
   */
  const handleLoginPress = async (values: FormValues) => {
    setLoading(true);
    const res = await login(values.email.trim(), values.password);
    if (!res.status) {
      Popup.error(res.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={handleLoginPress}>
      {({handleChange, handleSubmit, handleBlur, values, errors}) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          <View style={styles.inner}>
            <Text style={styles.title}>Welcome Back</Text>
            <Input
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              testID="login-email"
              error={errors.email}
            />
            <Input
              label="Password"
              secureTextEntry
              secureToggle
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              testID="login-password"
              error={errors.password}
            />
            <Button
              title="Login"
              onPress={() => handleSubmit()}
              loading={loading}
            />
            <Button
              variant="outline"
              title="Go to Signup"
              onPress={() => navigation.navigate('Signup')}
            />
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  inner: {flex: 1, padding: scale.ms(20), justifyContent: 'center'},
  title: {
    fontSize: scale.font(24),
    fontFamily: fonts.bold,
    marginBottom: scale.mvs(30),
    color: colors.textPrimary,
  },
  error: {
    color: colors.error,
    marginTop: scale.mvs(4),
    fontFamily: fonts.medium,
  },
});

export default LoginScreen;
