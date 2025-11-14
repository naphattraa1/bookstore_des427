// components/Loader.tsx
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1C3D6E" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,                // ให้กินเต็มพื้นที่ เพื่อจัดกลางจอ
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loader;