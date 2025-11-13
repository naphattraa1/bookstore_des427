// screens/HomeScreen.tsx
import React, { useState, useMemo } from "react";
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
import mockBooks from "../utils/mockBooks50";
import BookItem from "../components/BookItem";
import { useCart } from "../context/CartContext";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { addToCart, totalItems } = useCart();
  const [query, setQuery] = useState("");

  const filteredBooks = useMemo(() => {
    const q = query.toLowerCase();
    return mockBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.publisher.toLowerCase().includes(q) ||
        b.isbn.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Bookstore</Text>
        <Button
          title={`Cart (${totalItems})`}
          onPress={() => navigation.navigate("Cart")}
        />
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search by title, author, publisher, ISBN"
        value={query}
        onChangeText={setQuery}
      />

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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f3f3" },
  topBar: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
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
});

export default HomeScreen;