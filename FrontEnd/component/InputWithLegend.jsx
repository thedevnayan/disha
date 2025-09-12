import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputWithLegend = ({ label, value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <View style={styles.legendContainer}>
        <Text style={styles.legendText}>{label}</Text>
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  legendContainer: {
    width: "auto",
    marginHorizontal: 12,
    position: "absolute",
    top: -8,
    zIndex: 99,
    backgroundColor: "#fcfcf8ff"
  },
  legendText: {
    marginHorizontal: 2,
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    height: 54,
    padding: 10,
    fontSize: 16,
    color: "#1C1C0D",
    paddingHorizontal: 18,
  },
});

export default InputWithLegend;
