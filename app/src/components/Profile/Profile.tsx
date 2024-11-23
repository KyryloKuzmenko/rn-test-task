import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import LogoutButton from '../buttons/LogoutButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logOut } from '../../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import RootParamList from '../../types/types';
import { useEffect, useState } from 'react';
import { setUser, RootState } from '../../redux/store';
import axios from 'axios';
import { Image } from 'react-native';


const url = 'https://reqres.in/';

export default function Profile() {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
        setEmail(parsedUser.email);
        setUserName(parsedUser.name || '');
      } else {
        navigation.replace('StartScreen');
      }
    };

    loadUserFromStorage();
    fetchProfileData();
  }, [dispatch, navigation]);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${url}api/users/1`);
      console.log(response.data)
      setProfileData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    dispatch(logOut());
    navigation.replace('Auth');
  };

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size={'large'} color="#0000ff" />
        ) : (
          profileData && (
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: profileData.avatar }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>{userName}</Text>
                <Text style={styles.name}>{email}</Text>
              </View>
            </View>
          )
        )}
      </View>
      <LogoutButton onPress={handleLogout} style={styles.logoutButton} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  profileContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  logoutButton: {
    width: 300,
    bottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
