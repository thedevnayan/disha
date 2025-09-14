// app/login.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import ProgressBar from "@/component/ProgressBar";
import YellowBtn from "@/component/YellowBtn";
import "../global.css";
import { useSession } from "./_layout"; // same context used in signup-step.tsx

export default function Login() {
  const router = useRouter();
  const { signIn } = useSession();

  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // TODO: If using Firebase:
  // import auth from '@react-native-firebase/auth';
  // const [confirm, setConfirm] = useState<auth.ConfirmationResult | null>(null);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return;
    }
    try {
      setLoading(true);
      // Firebase example:
      // const e164 = phone.startsWith('+') ? phone : `+91${phone}`;
      // const res = await auth().signInWithPhoneNumber(e164);
      // setConfirm(res);
      setOtpSent(true);
      Alert.alert("OTP Sent", `OTP has been sent to ${phone}`);
    } catch (e: any) {
      Alert.alert("Failed", e?.message ?? "Could not send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit OTP");
      return;
    }
    try {
      setLoading(true);
      // Firebase example:
      // if (!confirm) throw new Error('No confirmation state');
      // const cred = await confirm.confirm(otp);
      // Optional: fetch user profile, etc.
      signIn(); // set session in your context
      router.replace("/mainNavigation"); // go to the authenticated area
    } catch (e: any) {
      Alert.alert("Verification failed", e?.message ?? "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 16}}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={{ flex: 1 }}
      >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 72,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            router.back();
          }}
        >
        <Image source={require("@/assets/images/BackWard.png")} />
        </TouchableOpacity>
        <Text
          style={{
            alignContent: "center",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          Log In
        </Text>
        <Text>  </Text>
      </View>


        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Enter the mobile number to receive an OTP for verification.
          </Text>

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="10-digit mobile number"
            keyboardType="phone-pad"
            maxLength={10}
          />

          {!otpSent && (
            <YellowBtn
              btnTitle={loading ? "Sending..." : "Send OTP"}
              f={handleSendOtp}
            />
          )}

          {otpSent && (
            <>
              <Text style={styles.label}>Enter OTP</Text>
              <TextInput
                style={styles.otpInput}
                value={otp}
                onChangeText={setOtp}
                placeholder="6-digit code"
                keyboardType="number-pad"
                maxLength={6}
              />
              <YellowBtn
                btnTitle={loading ? "Verifying..." : "Verify & Continue"}
                f={handleVerifyOtp}
              />
              <TouchableOpacity
                onPress={handleSendOtp}
                disabled={loading}
                style={{ alignSelf: "center", marginTop: 14 }}
              >
                <Text style={{ color: "#6B7280" }}>
                  Didn’t get the code? Resend
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Mirrors signup-step.tsx style tokens
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1C1C0D",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },
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
