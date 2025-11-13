// components/Loader.tsx
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loader;