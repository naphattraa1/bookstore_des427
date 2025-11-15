// screens/BookDetailScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../App";
import { fetchBooks } from "../utils/mockBooks50";
import { useCart } from "../context/CartContext";
import { Image } from "react-native";

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
  image?: string;
};

const NAVY = "#1C3D6E";
const CREAM = "#F7F2E8";

// ----- component -----
const BookDetailScreen: React.FC<Props> = ({ route }) => {
  const { bookId } = route.params;
  const { addToCart } = useCart();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const allBooks = await fetchBooks(); // ✅ load from Firebase
        const found = allBooks.find((b: any) => b.id === bookId);
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
        <ActivityIndicator size="large" color={NAVY} />
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
      {/* Scrollable content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero card */}
        <View style={styles.heroCard}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.publisher}>{book.publisher}</Text>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>ISBN</Text>
              <Text style={styles.badgeValue}>{book.isbn}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>In stock</Text>
              <Text style={styles.badgeValue}>
                {book.remaining_quantity} pcs
              </Text>
            </View>
          </View>
        </View>

        {/* Info section */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Book information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Author</Text>
            <Text style={styles.infoValue}>{book.author || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Publisher</Text>
            <Text style={styles.infoValue}>{book.publisher || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ISBN</Text>
            <Text style={styles.infoValue}>{book.isbn || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Stock remaining</Text>
            <Text style={styles.infoValue}>{book.remaining_quantity}</Text>
          </View>

          {(
            <Image
              source={{
                uri: book.image ?? `https://loremflickr.com/300/400/book,novel?lock=${book.id}`,
              }}
              style={{
                width: 180,
                height: 260,
                alignSelf: "center",
                marginTop: 20,
                borderRadius: 12,
              }}
              resizeMode="cover"
            />
          )}

        </View>
      </ScrollView>

      {/* Bottom bar: price + add button */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>{book.price} THB</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(book)}
        >
          <Text style={styles.addButtonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ----- styles -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 120, // เว้นที่ให้ bottom bar
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CREAM,
  },
  notFound: {
    fontSize: 18,
    fontWeight: "600",
    color: NAVY,
  },

  // hero
  heroCard: {
    backgroundColor: "#FFF6ED",
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: NAVY,
    marginBottom: 6,
  },
  author: {
    fontSize: 14,
    color: "#6A6259",
  },
  publisher: {
    fontSize: 13,
    color: "#8A7C6E",
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#E3EAF6",
    borderRadius: 14,
    marginRight: 8,
  },
  badgeLabel: {
    fontSize: 10,
    color: "#5A6A88",
  },
  badgeValue: {
    fontSize: 12,
    fontWeight: "600",
    color: NAVY,
    marginTop: 2,
  },

  // info
  infoCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: NAVY,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: "#7C7267",
  },
  infoValue: {
    fontSize: 13,
    color: "#2C2620",
    maxWidth: "60%",
    textAlign: "right",
  },

  // bottom bar
  bottomBar: {
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
  priceLabel: {
    fontSize: 12,
    color: "#8A7C6E",
  },
  priceValue: {
    fontSize: 20,
    fontWeight: "700",
    color: NAVY,
  },
  addButton: {
    marginLeft: 16,
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: NAVY,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default BookDetailScreen;