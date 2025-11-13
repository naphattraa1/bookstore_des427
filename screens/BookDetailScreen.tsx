// screens/BookDetailScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../App";
import { fetchBooks } from "../utils/mockBooks50";
import { useCart } from "../context/CartContext";

// ----- types -----
type BookDetailRouteProp = RouteProp<RootStackParamList, "BookDetail">;
type BookDetailNavProp = StackNavigationProp<RootStackParamList, "BookDetail">;

type Props = {
  route: BookDetailRouteProp;
  navigation: BookDetailNavProp;
};

type Book = {
  id: string;
  author: string;
  isbn: string;
  price: number;
  publisher: string;
  remaining_quantity: number;
  title: string;
};

// ----- component -----
const BookDetailScreen: React.FC<Props> = ({ route }) => {
  const { bookId } = route.params;
  const { addToCart } = useCart();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const allBooks = await fetchBooks();        // ✅ load from Firebase
        const found = allBooks.find((b) => b.id === bookId);
        setBook(found || null);
      } catch (e) {
        console.error("Error loading book detail:", e);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [bookId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Book not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>

      <Text style={styles.label}>Author:</Text>
      <Text style={styles.value}>{book.author}</Text>

      <Text style={styles.label}>Publisher:</Text>
      <Text style={styles.value}>{book.publisher}</Text>

      <Text style={styles.label}>ISBN:</Text>
      <Text style={styles.value}>{book.isbn}</Text>

      <Text style={styles.label}>Price:</Text>
      <Text style={styles.value}>{book.price} THB</Text>

      <Text style={styles.label}>In stock:</Text>
      <Text style={styles.value}>{book.remaining_quantity}</Text>

      <View style={styles.buttonRow}>
        <Button title="Add to cart" onPress={() => addToCart(book)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    fontSize: 18,
    fontWeight: "600",
    color: "red",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
  },
  buttonRow: {
    marginTop: 24,
  },
});

export default BookDetailScreen;