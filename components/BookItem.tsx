// components/BookItem.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { Book } from "../context/CartContext";

type Props = {
  book: Book;
  onPress: () => void;
  onAddToCart: () => void;
};

const BookItem: React.FC<Props> = ({ book, onPress, onAddToCart }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.meta}>
          {book.author} • {book.publisher}
        </Text>
        <Text style={styles.meta}>ISBN: {book.isbn}</Text>
        <Text style={styles.price}>{book.price} THB</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },
  info: {
    flexShrink: 1,
    paddingRight: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  meta: {
    color: "#666",
    fontSize: 12,
  },
  price: {
    marginTop: 6,
    fontWeight: "600",
    color: "#2a7",
  },
  addButton: {
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#007AFF",
    borderRadius: 6,
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default BookItem;