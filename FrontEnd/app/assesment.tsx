import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'expo-router';
import ImgFeatureCard from '@/component/ImgFeatureCard';
const router = useRouter();

const Assesment = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                height: "100%",
                backgroundColor: "#fcfcf8ff",
                paddingHorizontal: 28
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    height: 72,
                    justifyContent:"space-between",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity activeOpacity={0.6} onPress={() => router.back()}>
                    <Image source={require("@/assets/images/BackWard.png")} />
                </TouchableOpacity>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>Aptitude Assessment</Text>
                <Text></Text>
            </View>
            <View>
                <ImgFeatureCard img={require("@/assets/images/book.png")} title="Personality" desc="Explore your personality type and how it aligns with different careers." />
            </View>
        </SafeAreaView>
    )
}

export default Assesment

const styles = StyleSheet.create({})