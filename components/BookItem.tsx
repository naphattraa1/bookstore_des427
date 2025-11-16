// components/BookItem.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { updateBookQuantity } from "../utils/updateBookQuantity";

type Book = {
  id: string;
  author: string;
  isbn: string;
  price: number;
  publisher: string;
  remaining_quantity: number;
  title: string;
};

type Props = {
  book: Book;
  onPress: () => void;
  onAddToCart: () => void;
  primaryColor?: string; // รับสีจาก HomeScreen
};

const BookItem: React.FC<Props> = ({
  book,
  onPress,
  onAddToCart,
  primaryColor = "#1C3D6E",
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author || "Unknown author"}
        </Text>
        <Text style={styles.publisher} numberOfLines={1}>
          {book.publisher}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.price}>{book.price.toFixed(0)} ฿</Text>
          <Text style={styles.stock}>
            {book.remaining_quantity > 0
              ? `${book.remaining_quantity} in stock`
              : "Out of stock"}
          </Text>
        </View>
      </View>

      <View style={styles.rightColumn}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: primaryColor }]}
          onPress={ onAddToCart }
          activeOpacity={0.9}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  info: {
    flex: 1,
    paddingRight: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C3D6E",
  },
  author: {
    fontSize: 12,
    color: "#6A6259",
    marginTop: 2,
  },
  publisher: {
    fontSize: 11,
    color: "#A39789",
    marginTop: 2,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4A443E",
    marginRight: 10,
  },
  stock: {
    fontSize: 11,
    color: "#9A8E82",
  },

  rightColumn: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  addButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
});

export default BookItem;