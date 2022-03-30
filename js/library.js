class Book {
   constructor(title, author, pages, read = false) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
   }
}

class Library {
   constructor(books = []) {
      this.bookShelf = books;
   }

   addBook(book) {
      this.bookShelf.push(book);
   }

   removeBook(book) {
      this.bookShelf.splice(this.bookShelf.indexOf(book), 1);
   }

   hasBook(title) {
      return this.bookShelf.some((book) => book.title === title);
   }
}
