// utils/mockBooks50.js

export const mockBooks = Array.from({ length: 50 }).map((_, i) => {
    const id = i + 1;
  
    const authors = [
      "J.K. Rowling",
      "George R.R. Martin",
      "Haruki Murakami",
      "Neil Gaiman",
      "Stephen King",
    ];
  
    const publishers = ["Penguin", "HarperCollins", "Kodansha", "Vintage"];
  
    return {
      id: id.toString(),
      title: `Book Title ${id}`,
      author: authors[i % authors.length],
      publisher: publishers[i % publishers.length],
      isbn: `ISBN-${1000000000 + id}`,
      price: Math.floor(Math.random() * 40) + 10, // 10–49
      stock: Math.floor(Math.random() * 10) + 1, // 1–10
      description: `This is a mock description for book number ${id}`,
    };
  });