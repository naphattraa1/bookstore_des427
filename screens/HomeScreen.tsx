// screens/HomeScreen.tsx
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../App";
import { fetchBooks } from "../utils/mockBooks50";
import BookItem from "../components/BookItem";
import { useCart } from "../context/CartContext";

// ---------- Types ----------
type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Book = {
  id: string; // ใช้เป็น key และส่งไปหน้ารายละเอียด
  author: string;
  isbn: string;
  price: number;
  publisher: string;
  remaining_quantity: number;
  title: string;
};

type Props = {
  navigation: HomeScreenNavigationProp;
};

// ---------- Component ----------
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { addToCart, totalItems } = useCart();
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const fetched = await fetchBooks();

      // ปรับข้อมูลจาก Firebase ให้มี id เสมอ
      const normalized: Book[] = fetched.map((b: any, index: number) => ({
        id: b.id ?? String(index), // ถ้าใน Firebase ไม่มี field id จะใช้ index แทน
        isbn: b.isbn ?? "",
        author: b.author ?? "",
        price: Number(b.price ?? 0),
        publisher: b.publisher ?? "",
        remaining_quantity: Number(b.remaining_quantity ?? 0),
        title: b.title ?? "",
      }));

      setBooks(normalized);
      setLoading(false);
    };

    loadBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    const q = query.toLowerCase();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.publisher.toLowerCase().includes(q) ||
        b.isbn.toLowerCase().includes(q)
    );
  }, [query, books]);

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Bookstore</Text>
        <Button
          title={`Cart (${totalItems})`}
          onPress={() => navigation.navigate("Cart")}
        />
      </View>

      {/* Search box */}
      <TextInput
        style={styles.search}
        placeholder="Search by title, author, publisher, ISBN"
        value={query}
        onChangeText={setQuery}
      />

      {/* Loading state */}
      {loading ? (
        <View style={styles.center}>
          <Text>Loading books...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookItem
              book={item}
              onPress={() =>
                navigation.navigate("BookDetail", { bookId: item.id })
              }
              onAddToCart={() => addToCart(item)}
            />
          )}
          contentContainerStyle={{ paddingVertical: 8 }}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text>No books found.</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f3f3" },
  topBar: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 2,
  },
  title: { fontSize: 20, fontWeight: "700" },
  search: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;