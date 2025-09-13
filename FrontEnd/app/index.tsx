import { Text, View, Image } from "react-native";
import FeatureCard from "@/component/FeatureCard";
import YellowBtn from "@/component/YellowBtn";
import HighLightBtn from "@/component/HighLightBtn";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


const route = useRouter();
const onStarted = ()=>{
  route.navigate("/createAccount")
}

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        height: "100%",
        backgroundColor: "#fcfcf8ff",
      }}
    >
      <Image
        source={require("@/assets/images/Welcome-img.png")}
        resizeMode="cover"
        style={{ margin: 0, width: "100%" , maxHeight: 240}}
      />
      <View style={{ paddingHorizontal: 24, paddingBottom: 18 }}>
        <Text
          style={{
            fontSize: 28,
            paddingTop: 32,
            paddingBottom: 12,
            textAlign: "center",
            fontWeight: "600",
            color: "#1C1C0D",
            paddingHorizontal: 24
          }}
        >
          Your Path to Success Starts Here
        </Text>
        <Text
          style={{
            color: "#475569",
            fontWeight: "500",
            textAlign: "center",
            fontSize: 15,
            lineHeight: 20,
            paddingHorizontal: 24
          }}
        >
          Unlock your potential with personalized career guidance and college
          recommendations tailored for students in Jammu & Kashmir.
        </Text>
        <View style={{ gap: 8 ,paddingHorizontal: 36}}>
          <FeatureCard
            icon={require("@/assets/images/Graduate.png")}
            heading={"Personalized Career Guidance"}
            detail={"Tailored advice to match your unique talents."}
          />
          <FeatureCard
            icon={require("@/assets/images/college.png")}
            heading={"Government College Recommendations"}
            detail={"Discover the best government colleges for you."}
          />
          <FeatureCard
            icon={require("@/assets/images/book.png")}
            heading={"Expert Advice and Resources"}
            detail={"Access a wealth of knowledge to guide your decisions."}
          />
          <YellowBtn btnTitle={"Get Started"} f={onStarted}/>
          <HighLightBtn btnTitle={"Login"} f={onStarted}/>
        </View>
      </View>
    </SafeAreaView>
  );
}