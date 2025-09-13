import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, ActionSheetIOS, Modal, FlatList } from "react-native";

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
  const [modalVisible, setModalVisible] = useState(false);

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
      // Android & Web use modal
      setModalVisible(true);
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

      {/* Modal for Android & Web */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    minWidth: 240,
    maxHeight: 380,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: "center",
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#374151",
  },
  cancelButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  cancelText: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "600",
  },
});

export default DropdownWithLegend;
