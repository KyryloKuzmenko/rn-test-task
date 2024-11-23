import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { SafeAreaView, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
