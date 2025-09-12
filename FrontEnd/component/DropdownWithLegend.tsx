import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, ActionSheetIOS, Alert } from "react-native";

type Option = {
  label: string;
  value: string;
};

type DropdownWithLegendProps = {
  label: string;
  value: string;
  onValueChange: (val: string) => void; 
  options: Option[];
  placeholder?: string;
};

const DropdownWithLegend: React.FC<DropdownWithLegendProps> = ({
  label,
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
}) => {
  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const showPicker = () => {
    if (Platform.OS === 'ios') {
      // iOS ActionSheet
      const optionLabels = options.map(option => option.label);
      
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', ...optionLabels],
          cancelButtonIndex: 0,
          title: `Select ${label}`,
        },
        (buttonIndex) => {
          if (buttonIndex > 0) {
            const selectedOption = options[buttonIndex - 1];
            onValueChange(selectedOption.value);
          }
        }
      );
    } else {
      // Android Alert Picker
      const buttons = options.map(option => ({
        text: option.label,
        onPress: () => onValueChange(option.value),
      }));
      
      buttons.push({
        text: 'Cancel',
        style: 'cancel',
      } as any);

      Alert.alert(
        `Select ${label}`,
        '',
        buttons
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.legendContainer}>
        <Text style={styles.legendText}>{label}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={showPicker}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.displayText, 
          !selectedOption && styles.placeholderStyle
        ]}>
          {displayText}
        </Text>
        <Text style={styles.iconStyle}>▼</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  legendContainer: {
    position: "absolute",
    top: -8,
    left: 12,
    backgroundColor: "#fcfcf8ff",
    zIndex: 1,
    paddingHorizontal: 4,
  },
  legendText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    height: 54,
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "#fcfcf8ff",
    flexDirection: "row",
    alignItems: "center",
  },
  displayText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
  },
  placeholderStyle: {
    color: "#9CA3AF",
  },
  iconStyle: {
    fontSize: 12,
    color: "#9CA3AF",
    marginLeft: 10,
  },
  // Keeping original styles for reference
  dropdownStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
    height: "100%",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#374151",
  },
  dropdownContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemTextStyle: {
    fontSize: 16,
    color: "#374151",
  },
  pickerInput: {
    fontSize: 16,
    color: "#374151",
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 0,
    paddingRight: 30,
  },
});

export default DropdownWithLegend;
