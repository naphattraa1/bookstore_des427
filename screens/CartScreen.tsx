// screens/CartScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../App";
import { useCart } from "../context/CartContext";

type NavProps = StackNavigationProp<RootStackParamList, "Cart">;

type Props = {
  navigation: NavProps;
};

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const { cart, removeFromCart, totalItems, totalPrice } = useCart();

  const renderItem = ({ item }: any) => (
    <View style={styles.itemCard}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemMeta}>
          {item.author ? `${item.author} • ` : ""}
          {item.publisher}
        </Text>

        <View style={styles.itemBottomRow}>
          <View style={styles.qtyBadge}>
            <Text style={styles.qtyText}>x {item.qty}</Text>
          </View>
          <Text style={styles.priceText}>{item.price} THB</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <Text style={styles.headerSubtitle}>
          {totalItems} item{totalItems !== 1 ? "s" : ""} in your basket
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyWrapper}>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyText}>
              Browse the bookstore and add something you like.
            </Text>
          </View>
        }
        contentContainerStyle={[
          styles.listContent,
          cart.length === 0 && { flex: 1 },
        ]}
        showsVerticalScrollIndicator={false}
      />

      {/* Summary / Checkout bar */}
      <View style={styles.summaryBar}>
        <View style={styles.summaryLeft}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryAmount}>{totalPrice} THB</Text>
          <Text style={styles.summaryItems}>
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </Text>
        </View>

        <TouchableOpacity
          disabled={totalItems === 0}
          style={[
            styles.checkoutButton,
            totalItems === 0 && styles.checkoutButtonDisabled,
          ]}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.checkoutText}>
            {totalItems === 0 ? "Add books first" : "Checkout"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NAVY = "#1C3D6E";
const CREAM = "#F7F2E8";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
  },

  // Header
  topBar: {
    paddingTop: 44,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: NAVY,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#6A6259",
    marginTop: 4,
  },

  // List
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 110, // เผื่อพื้นที่ให้ summary bar
  },

  itemCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    alignItems: "center",
  },
  itemLeft: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2C2620",
  },
  itemMeta: {
    fontSize: 12,
    color: "#8A7C6E",
    marginTop: 2,
  },
  itemBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#E3EAF6",
    marginRight: 8,
  },
  qtyText: {
    fontSize: 12,
    color: NAVY,
    fontWeight: "600",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1B8148",
  },

  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#F3B4AA",
    backgroundColor: "#FFF1ED",
  },
  removeButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#C23832",
  },

  // Empty state
  emptyWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: NAVY,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    color: "#7C7267",
    textAlign: "center",
  },

  // Summary bar
  summaryBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: CREAM,
    borderTopWidth: 1,
    borderColor: "#E1D7C9",
    flexDirection: "row",
    alignItems: "center",
  },
  summaryLeft: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#8A7C6E",
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: NAVY,
  },
  summaryItems: {
    fontSize: 12,
    color: "#8A7C6E",
    marginTop: 2,
  },

  checkoutButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: NAVY,
  },
  checkoutButtonDisabled: {
    backgroundColor: "#B1B9C9",
  },
  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});

export default CartScreen;