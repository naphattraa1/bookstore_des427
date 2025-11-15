import { database } from "../firebase/firebase";
import { ref, update } from "firebase/database";

/**
 * Updates the remaining quantity of a book in Firebase.
 * @param bookId - The ID of the book to update.
 * @param newQuantity - The new remaining quantity.
 */
export const updateBookQuantity = async (bookId: string, newQuantity: number): Promise<void> => {
  try {
    const bookRef = ref(database, `books/${bookId}`);
    await update(bookRef, { remaining_quantity: newQuantity });
    console.log(`Book ${bookId} updated with new quantity: ${newQuantity}`);
  } catch (error) {
    console.error("Error updating book quantity:", error);
  }
};