// Book class
class Book {
   constructor(title, author, pages, read = false) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
   }
}

// Library class
class Library {
   constructor(books = []) {
      this.bookShelf = books;
   }

   addBook(book) {
      this.bookShelf.push(book);
   }

   removeBook(title) {
      const bookIndex = this.bookShelf.findIndex((book) => book.title === title);
      this.bookShelf.splice(bookIndex, 1);
   }

   hasBook(title) {
      return this.bookShelf.some((book) => book.title === title);
   }
}
