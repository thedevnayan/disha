// ProgressBar.jsx
import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const ProgressBar = ({ initial = 0, toProgress = 0 }) => {
  const progress = useRef(new Animated.Value(initial)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: toProgress,
      duration: 800, // animation speed (ms)
      useNativeDriver: false,
    }).start();
  }, [toProgress]);

  // Interpolate progress into widths for 3 bars
  const bar1Width = progress.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["0%", "100%", "100%", "100%"],
  });

  const bar2Width = progress.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["0%", "0%", "100%", "100%"],
  });

  const bar3Width = progress.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["0%", "0%", "0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {/* Bar 1 */}
      <View style={styles.track}>
        <Animated.View
          style={[styles.fill, { backgroundColor: "#f9f506ff", width: bar1Width }]}
        />
      </View>

      {/* Bar 2 */}
      <View style={styles.track}>
        <Animated.View
          style={[styles.fill, { backgroundColor: "#f9f506ff", width: bar2Width }]}
        />
      </View>

      {/* Bar 3 */}
      <View style={styles.track}>
        <Animated.View
          style={[styles.fill, { backgroundColor: "#f9f506ff", width: bar3Width }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  track: {
    width: "30%",
    height: 6,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  fill: {
    height: 6,
    borderRadius: 20,
  },
});

export default ProgressBar;
