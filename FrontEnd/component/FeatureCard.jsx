import { StyleSheet, Text, View } from 'react-native'
import IconCircle from "@/component/iconCircle"
import React from 'react'

export default function FeatureCard({icon , heading , detail}) {
  return (
    <View> 
    <View style={styles.feature_card}>
      <IconCircle imgLocation={icon}/>
      <View style={{paddingRight: 20}}>
        <Text style={styles.featureHeading}>{heading}</Text>
        <Text style={styles.featureDetail}>{detail}</Text>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    feature_card: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        paddingBottom: 18,
        // paddingHorizontal: 28,
        gap: 16
    },
    featureHeading: {
        fontSize: 16,
        color: "#1C1C0D",
        fontWeight: 700,
        paddingRight: 20
    },
    featureDetail:{
        fontSize: 16,
        fontWeight:300,
        color: "#6B7280",
        paddingRight: 20
    }
})