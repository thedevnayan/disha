import { StyleSheet, TouchableOpacity, View,Text } from 'react-native'

export default function HighLightBtn({btnTitle,f}) {
  return (
      <TouchableOpacity style={styles.btn} onPress={f} activeOpacity={0.6}>
        <Text style={styles.btnText}>{btnTitle}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor: "#fcfcf8ff",
        width: "auto",
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 45,
        borderWidth: 3,
        borderColor: "#f9f506ba",
    },
    btnText: {
        fontWeight: 800,
        fontSize: 14,
    },
})