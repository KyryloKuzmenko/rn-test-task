import { Text, TextInput, StyleSheet, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { Formik } from 'formik';

import validationSchema from '../validation/validationSchema'; // Подключи схему валидации
import { StackNavigationProp } from '@react-navigation/stack';
import RootParamList from '../types/types';
import { setUser } from '../redux/store';
import { AppDispatch } from '../redux/store';
import LoginButton from '../components/LoginButton';

const initialValues = { email: '', password: '' };

export default function Auth() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
        navigation.replace('Home');
      }
    };
    checkAuth();
  }, [dispatch, navigation]);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const userData = { email: values.email };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      dispatch(setUser(userData)); // Передаем объект с email
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              placeholder="example@gmail.com"
              placeholderTextColor="#999"
              style={[
                styles.input,
                touched.email && errors.email && styles.errorInput,
              ]}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Text style={styles.label}>Password</Text>
            <TextInput
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              placeholder="password"
              placeholderTextColor="#999"
              style={[
                styles.input,
                touched.password && errors.password && styles.errorInput,
              ]}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <LoginButton onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, 
  },
  errorInput: {
    borderColor: 'red', 
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
