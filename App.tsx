import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SingUpScreen from "./src/screens/SingUpScreen"
import SingInScreen from "./src/screens/SingInScreen"
import HomeScreen from "./src/screens/HomeScreen"

export type RootStackParamList = {
  SignUpScreen: undefined
  SignInScreen: undefined
  HomeScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="SignUpScreen" component={SingUpScreen} />
        <Stack.Screen name="SignInScreen" component={SingInScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
