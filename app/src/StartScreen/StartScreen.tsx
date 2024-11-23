import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { useDispatch, UseDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import RootParamList from '../types/types';
import { setUser } from '../redux/store';
import { AppDispatch } from '../redux/store';
import ContinueWithEmailBtn from '../components/buttons/ContinueWithEmailBtn';

export default function StartScreen() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
        navigation.replace('Home');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, navigation]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color="#0000ff" />
      </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <ContinueWithEmailBtn onPress={() => navigation.navigate('Auth')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
