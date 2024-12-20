import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './src/StartScreen/StartScreen';
import Auth from './src/Auth/Auth';
import Home from './src/Home/Home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false, gestureEnabled: true }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, gestureDirection: 'horizontal' }}
      />
    </Stack.Navigator>
  );
}
