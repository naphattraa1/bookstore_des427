// screens/CheckoutScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../App";
import { useCart } from "../context/CartContext";

type NavProps = StackNavigationProp<RootStackParamList, "Checkout">;

type Props = {
  navigation: NavProps;
};

const NAVY = "#1C3D6E";
const CREAM = "#F7F2E8";

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const { totalItems, totalPrice, clearCart } = useCart();

  const onConfirm = () => {
    if (totalItems === 0) return;

    Alert.alert("Order confirmed 🎉", "Thank you for your purchase!", [
      {
        text: "OK",
        onPress: () => {
          clearCart();
          navigation.navigate("Home");
        },
      },
    ]);
  };

  const isDisabled = totalItems === 0;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Checkout</Text>

        <Text style={styles.label}>Items in cart</Text>
        <Text style={styles.value}>{totalItems}</Text>

        <Text style={styles.label}>Total price</Text>
        <Text style={styles.totalPrice}>{totalPrice} THB</Text>

        {isDisabled && (
          <Text style={styles.hintText}>
            Your cart is empty. Please add some books first 📚
          </Text>
        )}

        <TouchableOpacity
          style={[styles.button, isDisabled && styles.buttonDisabled]}
          onPress={onConfirm}
          activeOpacity={isDisabled ? 1 : 0.8}
        >
          <Text style={styles.buttonText}>
            {isDisabled ? "No items to checkout" : "Confirm Purchase"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backLink}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.backText}>← Back to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutScreen;

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: NAVY,
    marginBottom: 18,
    textAlign: "center",
  },
  label: {
    fontSize: 13,
    color: "#7A6E62",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B342C",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: NAVY,
    marginTop: 4,
    marginBottom: 12,
  },
  hintText: {
    fontSize: 12,
    color: "#8C7C6D",
    marginBottom: 12,
  },
  button: {
    backgroundColor: NAVY,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#A0ADC4",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  backLink: {
    marginTop: 14,
    alignItems: "center",
  },
  backText: {
    fontSize: 13,
    color: "#6A6259",
  },
});