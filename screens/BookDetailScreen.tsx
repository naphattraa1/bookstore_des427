import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../App";
import { fetchBooks } from "../utils/mockBooks50"; // Use the named export
import { useCart } from "../context/CartContext";

type RouteProps = RouteProp<RootStackParamList, "BookDetail">;
type NavProps = StackNavigationProp<RootStackParamList, "BookDetail">;

type Props = {
  route: RouteProps;
  navigation: NavProps;
};

type Book = {
  id: string;
  isbn: string;
  author: string;
  price: number;
  publisher: string;
  remaining_quantity: number;
  title: string;
};

const BookDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { bookId } = route.params;
  const { addToCart } = useCart();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      const books = await fetchBooks(); // Fetch books from Firebase
      const foundBook = books.find((b) => b.id === bookId);
      setBook(foundBook || null);
    };

    loadBook();
  }, [bookId]);

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>Book not found.</Text>
      </View>
    );
  }

  const onAdd = () => {
    addToCart(book);
    navigation.navigate("Cart");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.meta}>Author: {book.author}</Text>
      <Text style={styles.meta}>Publisher: {book.publisher}</Text>
      <Text style={styles.meta}>ISBN: {book.isbn}</Text>
      <Text style={styles.price}>{book.price} THB</Text>
      <Button title="Add to Cart" onPress={onAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  meta: { fontSize: 14, color: "#555", marginBottom: 4 },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2a7",
    marginVertical: 16,
  },
});

export default BookDetailScreen;