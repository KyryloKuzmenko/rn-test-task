import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { logOut, setUser } from "../redux/store";
import { RootState } from "../redux/store";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import RootParamList from "../types/types";
import LogoutButton from "../components/LogoutButton";

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } else {
        navigation.replace("Auth");
      }
    };

    loadUserFromStorage();
  }, [dispatch, navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    dispatch(logOut());
    navigation.replace("Auth");
  };


  if (!user) {
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome</Text>
      <LogoutButton onPress={() => handleLogout()}/>
    </View>
  );
}
