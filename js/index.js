const form = document.querySelector('form');

const library = new Library([new Book('The Hobbit', 'J.R.R. Tolkien', 295, true), new Book('The Lord of the Rings', 'J.R.R. Tolkien', 393, true)]);

form.addEventListener('submit', (e) => {
   e.preventDefault();
   const { title, author, pages, read } = e.target;
   const book = new Book(title.value, author.value, pages.value, read.checked);
   if (library.hasBook(book.title)) {
      alert(`${book.title} is already in the library.`);
   } else {
      library.addBook(book);
      alert(`${book.title} has been added to the library.`);
   }
   displayBooks(library.bookShelf);
});

function displayBooks(books) {
   document.querySelector(".books").innerHTML = books.map(book => `
      <div class="book">
         <h2>${book.title}</h2>
         <p>by ${book.author}</p>
         <p>${book.pages} pages</p>
         <p>${book.read ? 'Read' : 'Not Read'}</p>
      </div>
   `).join("");
}

displayBooks(library.bookShelf);