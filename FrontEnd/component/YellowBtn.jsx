import { StyleSheet, TouchableOpacity, View,Text } from 'react-native'

export default function YellowBtn({btnTitle,f}) {
  return (
      <TouchableOpacity style={styles.btn} onPress={f} activeOpacity={0.6}>
        <Text style={styles.btnText}>{btnTitle}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor: "#F9F506",
        width: "auto",
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 45,
    },
    btnText: {
        fontWeight: 800,
        fontSize: 14
    },
})