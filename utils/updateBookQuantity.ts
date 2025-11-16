import { database } from "../firebase/firebase";
import { ref, get, child, update } from "firebase/database";

export const updateBookQuantity = async (id: string, newQuantity: number): Promise<void> => {
  try {
    const booksRef = ref(database, "books");
    // Get all books
    const snapshot = await get(booksRef);

    if (!snapshot.exists()) {
      console.error("No books found");
      return;
    }

    let targetKey = null;

    // Find the key where item.id === id
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      if (data.id === id) {
        targetKey = childSnapshot.key;
      }
    });

    if (!targetKey) {
      console.error("Book with that id not found");
      return;
    }

    // Now update the correct path
    const bookRef = ref(database, `books/${targetKey}`);
    await update(bookRef, { remaining_quantity: newQuantity });

    console.log(`Updated: books/${targetKey} → remaining_quantity = ${newQuantity}`);
  } catch (error) {
    console.error("Error updating book quantity:", error);
  }
};