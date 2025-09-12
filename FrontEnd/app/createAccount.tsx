import { useRouter } from "expo-router";
import InputWithLegend from "@/component/InputWithLegend";
import DropdownWithLegend from "@/component/DropdownWithLegend";
import { useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

// Example options
const classOptions = [
  { label: "Class 6", value: "6" },
  { label: "Class 7", value: "7" },
  { label: "Class 8", value: "8" },
  { label: "Class 9", value: "9" },
  { label: "Class 10", value: "10" },
  { label: "Class 11", value: "11" },
  { label: "Class 12", value: "12" },
];

const stateOptions = [
  { label: "Andaman and Nicobar Islands", value: "an" },
  { label: "Andhra Pradesh", value: "ap" },
  { label: "Arunachal Pradesh", value: "ar" },
  { label: "Assam", value: "as" },
  { label: "Bihar", value: "br" },
  { label: "Chandigarh", value: "ch" },
  { label: "Chhattisgarh", value: "ct" },
  { label: "Dadra and Nagar Haveli and Daman and Diu", value: "dn" },
  { label: "Delhi", value: "dl" },
  { label: "Goa", value: "ga" },
  { label: "Gujarat", value: "gj" },
  { label: "Haryana", value: "hr" },
  { label: "Himachal Pradesh", value: "hp" },
  { label: "Jammu and Kashmir", value: "jk" },
  { label: "Jharkhand", value: "jh" },
  { label: "Karnataka", value: "ka" },
  { label: "Kerala", value: "kl" },
  { label: "Ladakh", value: "la" },
  { label: "Lakshadweep", value: "ld" },
  { label: "Madhya Pradesh", value: "mp" },
  { label: "Maharashtra", value: "mh" },
  { label: "Manipur", value: "mn" },
  { label: "Meghalaya", value: "ml" },
  { label: "Mizoram", value: "mz" },
  { label: "Nagaland", value: "nl" },
  { label: "Odisha", value: "or" },
  { label: "Puducherry", value: "py" },
  { label: "Punjab", value: "pb" },
  { label: "Rajasthan", value: "rj" },
  { label: "Sikkim", value: "sk" },
  { label: "Tamil Nadu", value: "tn" },
  { label: "Telangana", value: "tg" },
  { label: "Tripura", value: "tr" },
  { label: "Uttar Pradesh", value: "up" },
  { label: "Uttarakhand", value: "uk" },
  { label: "West Bengal", value: "wb" },
];

const districtsByState: Record<string, { label: string; value: string }[]> = {
  an: [
    { label: "South Andaman", value: "south_andaman" },
    { label: "North and Middle Andaman", value: "north_middle_andaman" },
    { label: "Nicobar", value: "nicobar" },
  ],
  ap: [
    { label: "Anantapur", value: "anantapur" },
    { label: "Chittoor", value: "chittoor" },
    { label: "East Godavari", value: "east_godavari" },
    { label: "Visakhapatnam", value: "visakhapatnam" },
    // ...other districts
  ],
  ar: [
    { label: "Tawang", value: "tawang" },
    { label: "West Kameng", value: "west_kameng" },
    { label: "Papum Pare", value: "papum_pare" },
    // ...other districts
  ],
  as: [
    { label: "Kamrup", value: "kamrup" },
    { label: "Dibrugarh", value: "dibrugarh" },
    { label: "Jorhat", value: "jorhat" },
    // ...other districts
  ],
  br: [
    { label: "Patna", value: "patna" },
    { label: "Gaya", value: "gaya" },
    { label: "Muzaffarpur", value: "muzaffarpur" },
    // ...other districts
  ],
  ch: [
    { label: "Chandigarh", value: "chandigarh" },
  ],
  ct: [
    { label: "Raipur", value: "raipur" },
    { label: "Bilaspur", value: "bilaspur" },
    { label: "Durg", value: "durg" },
    // ...other districts
  ],
  dn: [
    { label: "Daman", value: "daman" },
    { label: "Diu", value: "diu" },
    { label: "Dadra & Nagar Haveli", value: "dadra_nagar_haveli" },
  ],
  dl: [
    { label: "New Delhi", value: "new_delhi" },
    { label: "Central Delhi", value: "central_delhi" },
    { label: "North West Delhi", value: "north_west_delhi" },
    // ...other districts
  ],
  ga: [
    { label: "North Goa", value: "north_goa" },
    { label: "South Goa", value: "south_goa" },
  ],
  gj: [
    { label: "Ahmedabad", value: "ahmedabad" },
    { label: "Surat", value: "surat" },
    { label: "Rajkot", value: "rajkot" },
    // ...other districts
  ],
  hr: [
    { label: "Gurgaon", value: "gurgaon" },
    { label: "Faridabad", value: "faridabad" },
    { label: "Hisar", value: "hisar" },
    // ...other districts
  ],
  hp: [
    { label: "Shimla", value: "shimla" },
    { label: "Kangra", value: "kangra" },
    { label: "Mandi", value: "mandi" },
    // ...other districts
  ],
  jk: [
  { label: "Srinagar", value: "srinagar" },
  { label: "Anantnag", value: "anantnag" },
  { label: "Baramulla", value: "baramulla" },
  { label: "Budgam", value: "budgam" },
  { label: "Ganderbal", value: "ganderbal" },
  { label: "Kupwara", value: "kupwara" },
  { label: "Pulwama", value: "pulwama" },
  { label: "Shopian", value: "shopian" },
  { label: "Kulgam", value: "kulgam" },
  { label: "Bandipora", value: "bandipora" },
  
  // Jammu Division
  { label: "Jammu", value: "jammu" },
  { label: "Kathua", value: "kathua" },
  { label: "Samba", value: "samba" },
  { label: "Udhampur", value: "udhampur" },
  { label: "Reasi", value: "reasi" },
  { label: "Rajouri", value: "rajouri" },
  { label: "Poonch", value: "poonch" },
  { label: "Doda", value: "doda" },
  { label: "Ramban", value: "ramban" },
  { label: "Kishtwar", value: "kishtwar" }
  ],
  jh: [
    { label: "Ranchi", value: "ranchi" },
    { label: "Dhanbad", value: "dhanbad" },
    { label: "Jamshedpur", value: "jamshedpur" },
    // ...other districts
  ],
  ka: [
    { label: "Bangalore Urban", value: "bangalore_urban" },
    { label: "Mysuru", value: "mysuru" },
    { label: "Mangaluru", value: "mangaluru" },
    // ...other districts
  ],
  kl: [
    { label: "Thiruvananthapuram", value: "thiruvananthapuram" },
    { label: "Kochi", value: "kochi" },
    { label: "Kozhikode", value: "kozhikode" },
    // ...other districts
  ],
  la: [
    { label: "Leh", value: "leh" },
    { label: "Kargil", value: "kargil" },
  ],
  ld: [
    { label: "Lakshadweep", value: "lakshadweep" },
  ],
  mp: [
    { label: "Indore", value: "indore" },
    { label: "Bhopal", value: "bhopal" },
    { label: "Gwalior", value: "gwalior" },
    // ...other districts
  ],
  mh: [
    { label: "Mumbai", value: "mumbai" },
    { label: "Pune", value: "pune" },
    { label: "Nagpur", value: "nagpur" },
    // ...other districts
  ],
  mn: [
    { label: "Imphal West", value: "imphal_west" },
    { label: "Thoubal", value: "thoubal" },
    // ...other districts
  ],
  ml: [
    { label: "East Khasi Hills", value: "east_khasi_hills" },
    { label: "West Garo Hills", value: "west_garo_hills" },
    // ...other districts
  ],
  mz: [
    { label: "Aizawl", value: "aizawl" },
    // ...other districts
  ],
  nl: [
    { label: "Dimapur", value: "dimapur" },
    { label: "Kohima", value: "kohima" },
    // ...other districts
  ],
  or: [
    { label: "Khordha", value: "khordha" },
    { label: "Cuttack", value: "cuttack" },
    // ...other districts
  ],
  py: [
    { label: "Puducherry", value: "puducherry" },
    { label: "Karaikal", value: "karaikal" },
    { label: "Yanam", value: "yanam" },
  ],
  pb: [
    { label: "Amritsar", value: "amritsar" },
    { label: "Ludhiana", value: "ludhiana" },
    { label: "Jalandhar", value: "jalandhar" },
    // ...other districts
  ],
  rj: [
      { label: "Ajmer", value: "ajmer" },
  { label: "Alwar", value: "alwar" },
  { label: "Banswara", value: "banswara" },
  { label: "Baran", value: "baran" },
  { label: "Barmer", value: "barmer" },
  { label: "Bharatpur", value: "bharatpur" },
  { label: "Bhilwara", value: "bhilwara" },
  { label: "Bikaner", value: "bikaner" },
  { label: "Bundi", value: "bundi" },
  { label: "Chittorgarh", value: "chittorgarh" },
  { label: "Churu", value: "churu" },
  { label: "Dausa", value: "dausa" },
  { label: "Dholpur", value: "dholpur" },
  { label: "Dungarpur", value: "dungarpur" },
  { label: "Hanumangarh", value: "hanumangarh" },
  { label: "Jaipur", value: "jaipur" },
  { label: "Jaisalmer", value: "jaisalmer" },
  { label: "Jalore", value: "jalore" },
  { label: "Jhalawar", value: "jhalawar" },
  { label: "Jhunjhunu", value: "jhunjhunu" },
  { label: "Jodhpur", value: "jodhpur" },
  { label: "Karauli", value: "karauli" },
  { label: "Kota", value: "kota" },
  { label: "Nagaur", value: "nagaur" },
  { label: "Pali", value: "pali" },
  { label: "Pratapgarh", value: "pratapgarh" },
  { label: "Rajsamand", value: "rajsamand" },
  { label: "Sawai Madhopur", value: "sawai_madhopur" },
  { label: "Sikar", value: "sikar" },
  { label: "Sirohi", value: "sirohi" },
  { label: "Sri Ganganagar", value: "sri_ganganagar" },
  { label: "Tonk", value: "tonk" },
  { label: "Udaipur", value: "udaipur" },
  { label: "Salumber", value: "salumber" },  // New district (as of 2023)
  { label: "Neem Ka Thana", value: "neem_ka_thana" }, // New district (as of 2023)
  { label: "Bhawani Mandi", value: "bhawani_mandi" }, // New district (as of 2023)
  { label: "Anupgarh", value: "anupgarh" }, // New district (as of 2023)
  { label: "Balotra", value: "balotra" }, // New district (as of 2023)
  { label: "Beawar", value: "beawar" }, // New district (as of 2023)
  { label: "Deeg", value: "deeg" }, // New district (as of 2023)
  { label: "Didwana-Kuchaman", value: "didwana_kuchaman" }, // New district (as of 2023)
  { label: "Dudu", value: "dudu" }, // New district (as of 2023)
  { label: "Gangapur City", value: "gangapur_city" }, // New district (as of 2023)
  { label: "Jaipur Rural", value: "jaipur_rural" }, // New district (as of 2023)
  { label: "Jodhpur Rural", value: "jodhpur_rural" }, // New district (as of 2023)
  { label: "Kotputli-Behror", value: "kotputli_behror" }, // New district (as of 2023)
  { label: "Kushalgarh", value: "kushalgarh" }, // New district (as of 2023)
  { label: "Mandawa", value: "mandawa" }, // New district (as of 2023)
  { label: "Phalodi", value: "phalodi" }, // New district (as of 2023)
  { label: "Shahpura", value: "shahpura" }, // New district (as of 2023)
  { label: "Shrimadhopur", value: "shrimadhopur" }, // New district (as of 2023)
  { label: "Jhotwara", value: "jhotwara" } // New district (as of 2023)
  ],
  sk: [
    { label: "East Sikkim", value: "east_sikkim" },
    { label: "West Sikkim", value: "west_sikkim" },
    // ...other districts
  ],
  tn: [
    { label: "Chennai", value: "chennai" },
    { label: "Coimbatore", value: "coimbatore" },
    { label: "Madurai", value: "madurai" },
    // ...other districts
  ],
  tg: [
    { label: "Hyderabad", value: "hyderabad" },
    { label: "Warangal", value: "warangal" },
    // ...other districts
  ],
  tr: [
    { label: "West Tripura", value: "west_tripura" },
    { label: "South Tripura", value: "south_tripura" },
    // ...other districts
  ],
  up: [
    { label: "Lucknow", value: "lucknow" },
    { label: "Varanasi", value: "varanasi" },
    { label: "Agra", value: "agra" },
    // ...other districts
  ],
  uk: [
    { label: "Dehradun", value: "dehradun" },
    { label: "Haridwar", value: "haridwar" },
    // ...other districts
  ],
  wb: [
    { label: "Kolkata", value: "kolkata" },
    { label: "Darjeeling", value: "darjeeling" },
    { label: "Howrah", value: "howrah" },
    // ...other districts
  ],
};

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Urdu", value: "ur" },
  { label: "Kashmiri", value: "ks" },
  { label: "Gujarati", value: "gu" },
  { label: "Marathi", value: "mr" },
];

const CreateAcc = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [currentClass, setCurrentClass] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [language, setLanguage] = useState("");

  // Form validation
  const validateForm = () => {
    if (!fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return false;
    }
    if (!currentClass) {
      Alert.alert("Error", "Please select your current class");
      return false;
    }
    if (!selectedState) {
      Alert.alert("Error", "Please select your state");
      return false;
    }
    if (!selectedDistrict) {
      Alert.alert("Error", "Please select your district");
      return false;
    }
    if (!language) {
      Alert.alert("Error", "Please select your preferred language");
      return false;
    }
    return true;
  };

  // Handle continue button
  const handleContinue = () => {
    if (validateForm()) {
      // Store form data (you can use context or pass as params)
      const formData = {
        fullName,
        currentClass,
        selectedState,
        selectedDistrict,
        language,
      };
      
      console.log("Form Data:", formData);
      
      // Navigate to next screen (SignupStep2 or email/password screen)
      // router.push("/signup-step2");
    }
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
          Create Account
        </Text>
        <Text></Text>
      </View>

      {/* Progress bar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 16,
        }}
      >
        <View
          style={{
            width: "30%",
            height: 6,
            borderRadius: 20,
            backgroundColor: "#f9f506ff",
          }}
        ></View>
        <View
          style={{
            width: "30%",
            height: 6,
            borderRadius: 20,
            backgroundColor: "#E2E8F0",
          }}
        ></View>
        <View
          style={{
            width: "30%",
            height: 6,
            borderRadius: 20,
            backgroundColor: "#E2E8F0",
          }}
        ></View>
      </View>

      {/* Form - Wrapped in ScrollView */}
<ScrollView 
  showsVerticalScrollIndicator={false}
  style={{ flex: 1 }}
  contentContainerStyle={{ paddingBottom: 100 }}
  nestedScrollEnabled={true} // Add this
  keyboardShouldPersistTaps="handled" // Add this
>

        <Text
          style={{
            fontSize: 26,
            fontWeight: "600",
            paddingTop: 24,
          }}
        >
          Let's get to know you
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
          Tell us a bit about yourself to get personalized recommendations.
        </Text>

        {/* Full Name */}
        <InputWithLegend
          label="Full Name"
          placeholder="Your full name"
          value={fullName}
          onChangeText={setFullName}
        />

        {/* Current Class */}
        <DropdownWithLegend
          label="Current Class"
          placeholder="Select your class"
          options={classOptions}
          value={currentClass}
          onValueChange={setCurrentClass}
        />

        {/* State */}
        <DropdownWithLegend
          label="State"
          placeholder="Select your state"
          options={stateOptions}
          value={selectedState}
          onValueChange={(val) => {
            setSelectedState(val);
            setSelectedDistrict(""); // reset district when state changes
          }}
        />

        {/* District */}
        <DropdownWithLegend
          label="District"
          placeholder="Select your district"
          options={districtsByState[selectedState] || []}
          value={selectedDistrict}
          onValueChange={setSelectedDistrict}
        />

        {/* Preferred Language */}
        <DropdownWithLegend
          label="Preferred Language"
          placeholder="Select your language"
          options={languageOptions}
          value={language}
          onValueChange={setLanguage}
        />
      </ScrollView>

      {/* Continue Button - Fixed at bottom */}
      <View style={{ paddingVertical: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#f9f506ff",
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
          activeOpacity={0.8}
          onPress={handleContinue}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#1F2937",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateAcc;
