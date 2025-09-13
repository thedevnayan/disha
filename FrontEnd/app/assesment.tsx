import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'expo-router';
import ImgFeatureCard from '@/component/ImgFeatureCard';
import ProgressBar from '@/component/ProgressBar';
import YellowBtn from '@/component/YellowBtn';


const Assesment = () => {
    const router = useRouter();
    const onStart = () =>{
        router.navigate("/quiz")
    }
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
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity activeOpacity={0.6} onPress={() => router.back()}>
                    <Image source={require("@/assets/images/BackWard.png")} />
                </TouchableOpacity>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>Aptitude Assessment</Text>
                <Text></Text>
            </View>

            {/* Progress bar */}
            <View style={{ justifyContent: "center" }}>
                <ProgressBar initial={2} toProgress={3} />
            </View>
            {/* Hero Container */}
            <View style={{alignItems: "center"}}>
                <Image
                    source={require("@/assets/images/assesment/hero-img.png")}
                    style={styles.imgStyle}
                ></Image>

                <View style={{
                    marginVertical: 24,
                }}>
                    <Text style={styles.title}>Discover Your Potential</Text>
                    <Text style={styles.desc}>Our aptitude assessment helps you understand your strengths and interests, guiding you towards the best career paths and educational opportunities.</Text>
                </View>

            </View>


            <View>
                <ImgFeatureCard img={require("@/assets/images/assesment/Personality-assessment-icon.png")} title="Personality" desc="Explore your personality type and how it aligns with different careers." />
                <ImgFeatureCard img={require("@/assets/images/assesment/Interests-assessment-icon.png")} title="Interests" desc="Discover your interests and how they can translate into fulfilling career paths." />
            </View>
            <YellowBtn btnTitle={"Start Assessment"} f={onStart}/>
        </SafeAreaView>
    )
}

export default Assesment

const styles = StyleSheet.create({
    title: {
        color: "#1C1C0D",
        fontSize: 26,
        fontWeight: 600,
        marginBottom: 8
    },
    desc: {
        color: "#6B7280",
        fontSize: 15,
    },
    imgStyle: {
        resizeMode: "cover",
        height: 256,
        width: "100%",
        borderRadius: 16
    }
})