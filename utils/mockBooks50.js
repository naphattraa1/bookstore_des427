import { database } from "../firebase/firebase";
import { ref, get } from "firebase/database";

export const fetchBooks = async () => {
  try {
    const booksRef = ref(database, "books");
    const snapshot = await get(booksRef);

    if (snapshot.exists()) {
      const booksData = snapshot.val();
      return Object.values(booksData); // Convert object to array
    } else {
      console.error("No books data found in Firebase.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching books from Firebase:", error);
    return [];
  }
};