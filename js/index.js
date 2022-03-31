"use strict";
const form = document.querySelector("form");

// sets libary to local storage if it exists, or creates new library
let library;
if (localStorage.getItem("books")) {
   library = new Library(JSON.parse(localStorage.getItem("books")));
} else {
   library = new Library([new Book("The Hobbit", "J.R.R. Tolkien", 295, true)]);
}

form.addEventListener("submit", (e) => {
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
   localStorage.setItem("books", JSON.stringify(library.bookShelf));
   hideForm();
});

function removeBook(title) {
   library.removeBook(title);
   displayBooks(library.bookShelf);
   localStorage.setItem("books", JSON.stringify(library.bookShelf));
}

function displayBooks(books) {
   const booksEl = document.querySelector(".books");
   booksEl.innerHTML = "";

   books.forEach((book) => {
      const bookEl = document.createElement("div");
      const closeBtn = document.createElement("div");
      closeBtn.classList.add("closeBtn");
      closeBtn.innerHTML = "X";

      bookEl.classList.add("book");
      bookEl.innerHTML = `
         <h2>${book.title}</h2>
         <p>by ${book.author}</p>
         <p>${book.pages} pages</p>
         <p>${book.read ? "read" : "not read"}</p>
      `;
      closeBtn.addEventListener("click", () => {
         removeBook(book.title);
      });
      bookEl.prepend(closeBtn);
      booksEl.appendChild(bookEl);
   });
}

displayBooks(library.bookShelf);

// UI Logic
const newBookBtn = document.getElementById("popup-menu");
const closeFormBtn = document.querySelector(".close-form");
const resetBtn = document.getElementById("reset");
const overlay = document.querySelector(".overlay");
const resetConfirm = document.getElementById("reset-confirm");

newBookBtn.addEventListener("click", (event) => {
   event.stopPropagation();
   if (form.offsetParent === null) {
      form.style.display = "block";
      overlay.style.display = "block";
      setTimeout(() => {
         form.classList.add("show-form");
      }, 1);
   }
});

form.addEventListener("click", (event) => {
   event.stopPropagation();
});

closeFormBtn.addEventListener("click", (event) => {
   event.stopPropagation();
   if (form.offsetParent) {
      hideForm();
   }
});

document.body.addEventListener("click", (event) => {
   if (form.offsetParent || resetConfirm.offsetParent) {
      hideForm();
   }
});

resetBtn.addEventListener("click", (event) => {
   event.stopPropagation();
   resetConfirm.style.display = "block";
   overlay.style.display = "block";
   setTimeout(() => {
      resetConfirm.classList.add("show-form");
   }, 1);
});

resetConfirm.addEventListener("click", (event) => {
   event.stopPropagation();
   localStorage.clear();
   library = new Library();
   localStorage.setItem("books", JSON.stringify(library.bookShelf));
   displayBooks(library.bookShelf);
});

function hideForm(){
   form.classList.add("fade-out");
   resetConfirm.classList.add("fade-out");
   overlay.style = "";
   setTimeout(() => {
      form.classList = "";
      resetConfirm.classList = "";
      form.style = "";
      resetConfirm.style = "";
   }, 350);
}