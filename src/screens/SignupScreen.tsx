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
import {RootStackParamList} from '../types/Navigation.interface';
import * as Yup from 'yup';
import {Formik} from 'formik';
import { Popup } from '../helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

// validation schema for signup form
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Please enter your name')
    .min(2, 'Name must be at least 2 characters')
    .label('Name'),
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
  name: '',
  email: '',
  password: '',
};

export type FormValues = typeof initialFormValues;

const SignupScreen: React.FC<Props> = ({navigation}) => {
  const {signup} = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSignupPress = async (values: FormValues) => {
    setLoading(true);
    const res = await signup(values.name.trim(), values.email.trim(), values.password);
    if (!res.status) {
      Popup.error(res.error || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={handleSignupPress}>
      {({handleChange, handleSubmit, handleBlur, values, errors}) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          <View style={styles.inner}>
            <Text style={styles.title}>Create Account</Text>
            <Input
              label="Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              error={errors.name}
            />
            <Input
              label="Email"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
            />
            <Input
              label="Password"
              secureTextEntry
              secureToggle
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password}
            />
            <Button title="Signup" onPress={() => handleSubmit()} loading={loading} />
            <Button
              variant="outline"
              title="Go to Login"
              onPress={() => navigation.goBack()}
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

export default SignupScreen;
