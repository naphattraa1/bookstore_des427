// screens/CartScreen.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../App";
import { useCart } from "../context/CartContext";

type NavProps = StackNavigationProp<RootStackParamList, "Cart">;

type Props = {
  navigation: NavProps;
};

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const { cart, removeFromCart, totalItems, totalPrice } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Your cart is empty.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                {item.qty} x {item.price} THB
              </Text>
            </View>
            <Button
              title="Remove"
              onPress={() => removeFromCart(item.id)}
              color="#ff3b30"
            />
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Items: {totalItems} | Total: {totalPrice} THB
        </Text>
        <Button
          title="Checkout"
          onPress={() => navigation.navigate("Checkout")}
          disabled={totalItems === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f3f3" },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  title: { fontWeight: "600", marginBottom: 4 },
  meta: { color: "#555" },
  empty: { textAlign: "center", marginTop: 40, color: "#888" },
  summary: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
    summaryText: {
    marginBottom: 8,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default CartScreen;