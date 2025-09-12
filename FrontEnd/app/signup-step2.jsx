import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupStep2() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold">Step 2: Email & Password</Text>
        <Text className="text-gray-600 mt-4">Coming soon...</Text>
      </View>
    </SafeAreaView>
  );
}
