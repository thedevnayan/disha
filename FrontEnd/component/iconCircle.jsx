import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

export default function iconCircle({imgLocation}) {
  return (
    <View style={styles.circle}>
      <Image source={imgLocation}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: 48,
    borderRadius: 100,
    backgroundColor: "#DBEAFE",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8
  }
})