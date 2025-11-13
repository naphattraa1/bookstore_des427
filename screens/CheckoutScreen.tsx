// screens/CheckoutScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../App";
import { useCart } from "../context/CartContext";

type NavProps = StackNavigationProp<RootStackParamList, "Checkout">;

type Props = {
  navigation: NavProps;
};

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const { totalItems, totalPrice, clearCart } = useCart();

  const onConfirm = () => {
    Alert.alert("Order confirmed", "Thank you for your purchase!", [
      {
        text: "OK",
        onPress: () => {
          clearCart();
          navigation.navigate("Home");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.text}>Total items: {totalItems}</Text>
      <Text style={styles.text}>Total price: {totalPrice} THB</Text>

      <Button
        title="Confirm Purchase"
        onPress={onConfirm}
        disabled={totalItems === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  text: { fontSize: 16, marginBottom: 8 },
});

export default CheckoutScreen;