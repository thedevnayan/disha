import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name="index" options={{title: "Welcome Screen"}}></Stack.Screen>
    <Stack.Screen name="createAccount" ></Stack.Screen>
  </Stack>;
}
