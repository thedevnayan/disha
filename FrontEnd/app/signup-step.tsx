// app/signup-step.tsx
import ProgressBar from "@/component/ProgressBar";
import YellowBtn from "@/component/YellowBtn";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { useSession } from './_layout';

const SignupStep = () => {
  const router = useRouter();
  const { formData } = useLocalSearchParams<{ formData?: string }>();

  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Mock send OTP
  const { signIn, setUserProfile } = useSession();
  const handleSendOtp = () => {
    if (phone.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }
    setOtpSent(true);
    Alert.alert("OTP Sent", `OTP has been sent to ${phone}`);
  };

  // Mock verify OTP
  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit OTP");
      return;
    }

    const data = {
      ...(formData ? JSON.parse(formData) : {}),
      phone,
      isAssessmentComplete: false, // default to false
    };

    setUserProfile(data); 
    signIn();
    router.push("/assesment");
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "rgba(252, 252, 248, 1)",
        flex: 1,
        paddingHorizontal: 28,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 72,
          alignItems: "center",
        }}
      >
        <TouchableOpacity activeOpacity={0.6} onPress={() => router.back()}>
          <Image source={require("@/assets/images/BackWard.png")} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>Create Account</Text>
        <Text></Text>
      </View>

      {/* Progress bar */}
      <View style={{ justifyContent: "center" }}>
        <ProgressBar initial={1} toProgress={2} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ fontSize: 26, fontWeight: "600", paddingTop: 24 }}>
          Create Your Account
        </Text>
        <Text
          style={{
            color: "#475569",
            fontSize: 14,
            lineHeight: 18,
            paddingTop: 6,
            paddingBottom: 20,
          }}
        >
          Enter your mobile number to receive an OTP for verification.
        </Text>

        {/* Phone Input */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          placeholderTextColor="#94A3B8"
          keyboardType="number-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
        />

        {!otpSent && <YellowBtn btnTitle="Send OTP" f={handleSendOtp} />}

        {otpSent && (
          <>
            <Text style={styles.label}>Enter OTP</Text>
            <TextInput
              style={styles.otpInput}
              placeholder="******"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />
            <YellowBtn btnTitle="Submit" f={handleVerifyOtp} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 8,
    color: "#6B7280",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    height: 54,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1C1C0D",
    backgroundColor: "white",
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    height: 54,
    fontSize: 18,
    color: "#1C1C0D",
    backgroundColor: "white",
    letterSpacing: 6,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default SignupStep;
