// screens/HomeScreen.tsx
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
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
  id: string;
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

type CategoryKey = "all" | "budget" | "premium";

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "All Books" },
  { key: "budget", label: "Under 500฿" },
  { key: "premium", label: "500฿ +" },
];

// ---------- Component ----------
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { addToCart, totalItems } = useCart();
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const fetched = await fetchBooks();

        const normalized: Book[] = fetched.map((b: any, index: number) => ({
          id: b.id ?? String(index),
          isbn: b.isbn ?? "",
          author: b.author ?? "",
          price: Number(b.price ?? 0),
          publisher: b.publisher ?? "",
          remaining_quantity: Number(b.remaining_quantity ?? 0),
          title: b.title ?? "",
        }));

        setBooks(normalized);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    const q = query.toLowerCase();
    return books
      .filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.publisher.toLowerCase().includes(q) ||
          b.isbn.toLowerCase().includes(q)
      )
      .filter((b) => {
        if (activeCategory === "budget") return b.price < 500;
        if (activeCategory === "premium") return b.price >= 500;
        return true;
      });
  }, [query, books, activeCategory]);

  const renderHeader = () => (
    <>
      {/* Hero card */}
      <View style={styles.heroCard}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Find Your Next Story</Text>
          <Text style={styles.heroSubtitle}>
            Explore our curated collection of books
          </Text>
        </View>

        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>{books.length}</Text>
          <Text style={styles.heroBadgeLabel}>Titles</Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat) => {
            const active = cat.key === activeCategory;
            return (
              <TouchableOpacity
                key={cat.key}
                onPress={() => setActiveCategory(cat.key)}
                style={[
                  styles.categoryChip,
                  active && styles.categoryChipActive,
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryText,
                    active && styles.categoryTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Available Books</Text>
        <Text style={styles.sectionCount}>({filteredBooks.length})</Text>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Text style={styles.appName}>Bookstore</Text>
          <Text style={styles.appTagline}>your cozy reading place</Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart")}
          activeOpacity={0.8}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search title, author, ISBN..."
            placeholderTextColor="#A39789"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => setQuery("")}
              style={styles.clearButton}
              activeOpacity={0.7}
            >
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <Text style={styles.loadingText}>Loading books...</Text>
        </View>
      ) : filteredBooks.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No books found</Text>
          <Text style={styles.emptySubtext}>
            Try adjusting your search or filters
          </Text>
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
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F2E8", // Cream BG
  },

  // Top Bar
  topBar: {
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "#F7F2E8",
  },

  topBarLeft: {
    flex: 1,
  },

  appName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1C3D6E", // Navy
    letterSpacing: -0.5,
  },

  appTagline: {
    fontSize: 13,
    color: "#6A6259",
    marginTop: 4,
    fontWeight: "500",
  },

  cartButton: {
    flexDirection: "row",
    backgroundColor: "#1C3D6E",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
    shadowColor: "#1C3D6E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    position: "relative",
  },

  cartIcon: {
    color: "#FFF",
    fontSize: 18,
  },

  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#E2CBB4",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: "#1C3D6E",
  },

  cartBadgeText: {
    color: "#1C3D6E",
    fontSize: 11,
    fontWeight: "800",
  },

  // Search Bar
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#E8DCCC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    color: "#6A6259",
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#4A443E",
    fontWeight: "500",
  },

  clearButton: {
    padding: 4,
    marginLeft: 8,
  },

  clearIcon: {
    fontSize: 16,
    color: "#6A6259",
    fontWeight: "600",
  },

  // Hero Card
  heroCard: {
    marginHorizontal: 20,
    marginTop: 28,
    backgroundColor: "#FFF6ED",
    padding: 24,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#E8DCCC",
  },

  heroContent: {
    flex: 1,
    marginRight: 16,
  },

  heroTitle: {
    fontSize: 20,
    color: "#1C3D6E",
    fontWeight: "800",
    letterSpacing: -0.3,
    marginBottom: 6,
  },

  heroSubtitle: {
    fontSize: 14,
    color: "#6A6259",
    marginTop: 2,
    lineHeight: 20,
    fontWeight: "500",
  },

  heroBadge: {
    backgroundColor: "#1C3D6E",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
    shadowColor: "#1C3D6E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  heroBadgeText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "800",
  },

  heroBadgeLabel: {
    color: "#E2CBB4",
    fontSize: 11,
    marginTop: 2,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // Categories
  categoryContainer: {
    marginTop: 24,
    marginBottom: 8,
  },

  categoryRow: {
    flexDirection: "row",
    marginHorizontal: 20,
  },

  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#D8C9BA",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  categoryChipActive: {
    backgroundColor: "#1C3D6E",
    borderColor: "#1C3D6E",
    shadowColor: "#1C3D6E",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },

  categoryText: {
    color: "#6A6259",
    fontSize: 13,
    fontWeight: "600",
  },

  categoryTextActive: {
    color: "#FFF",
    fontWeight: "700",
  },

  // Section Header
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1C3D6E",
    letterSpacing: -0.3,
  },

  sectionCount: {
    fontSize: 14,
    color: "#6A6259",
    marginLeft: 8,
    fontWeight: "600",
  },

  listContent: {
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  loadingText: {
    color: "#6A6259",
    fontSize: 16,
    fontWeight: "600",
  },

  emptyText: {
    color: "#1C3D6E",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },

  emptySubtext: {
    color: "#6A6259",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default HomeScreen;