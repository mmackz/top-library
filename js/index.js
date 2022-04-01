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

let newBookEl;
function displayBooks(books) {
   const booksEl = document.querySelector(".books");
   booksEl.innerHTML = "";

   books.forEach((book) => {
      const bookEl = document.createElement("div");
      const closeBtn = document.createElement("div");
      closeBtn.classList.add("closeBtn");
      closeBtn.innerHTML = `<i class="trash fa-regular fa-trash-can"></i>`;
      bookEl.classList.add("book");
      const bookTitle = document.createElement("h2");
      bookTitle.innerText = book.title;
      const bookAuthor = document.createElement("p");
      bookAuthor.innerText = "Author: " + book.author;
      bookEl.append(bookTitle, bookAuthor);
      bookEl.innerHTML += `
         <p>${book.pages} pages</p>
         <p><span>Have read? </span><span>${book.read ? "✅" : "❌"}</span>
         <span class="toggle-out ${book.read && "toggled-out"}" onclick="toggle(this)"}>
         <span class="toggle-in ${book.read && "toggled-in"}"></span></span></p>
         <img class="bookimg" src="images/books-cmp.png" alt="book cover" width="48px">
      `;
      closeBtn.addEventListener("click", () => {
         removeBook(book.title);
      });
      bookEl.prepend(closeBtn);
      booksEl.appendChild(bookEl);
      book.read && bookEl.classList.add("read");
   });

   if (!newBookEl) {
      createNewBookEl();
   }
   booksEl.appendChild(newBookEl);
}

function createNewBookEl() {
   const el = document.createElement("div");
   el.classList.add("book", "blank-book");
   el.innerHTML = `<i class="fa-solid fa-plus"></i>
                          <p>Add a new book</p>`;
   newBookEl = el;
}

function toggle(el) {
   el.classList.toggle("toggled-out");
   el.parentNode.parentNode.classList.toggle("read");
   el.parentNode.children[1].innerText = el.parentNode.children[1].innerText === "✅" ? "❌" : "✅";
   el.firstElementChild.classList.toggle("toggled-in");
}

displayBooks(library.bookShelf);

// UI Logic
const newBookBtn = document.getElementById("popup-menu");
const newBookElement = document.querySelector(".blank-book");
const closeFormBtn = document.querySelector(".close-form");
const resetBtn = document.getElementById("reset");
const overlay = document.querySelector(".overlay");
const resetConfirm = document.getElementById("reset-confirm");

newBookBtn.addEventListener("click", (event) => {
   event.stopPropagation();
   openForm();
});

newBookElement.addEventListener("click", (event) => {
   event.stopPropagation();
   openForm();
});

form.addEventListener("click", (event) => {
   event.stopPropagation();
});

closeFormBtn.addEventListener("click", (event) => {
   event.stopPropagation();
   if (form.classList.contains("show-form")) {
      hideForm();
   }
});

document.body.addEventListener("click", (event) => {
   if (form.classList.contains("show-form") || resetConfirm.classList.contains("show-form")) {
      hideForm();
   }
});

resetBtn.addEventListener("click", (event) => {
   event.stopPropagation();
   resetConfirm.style.display = "block";
   overlay.style.display = "block";
   setTimeout(() => {
      resetConfirm.classList.add("show-form", "form");
   }, 1);
});

resetConfirm.addEventListener("submit", (event) => {
   event.preventDefault();
   event.stopPropagation();
   localStorage.clear();
   library = new Library();
   localStorage.setItem("books", JSON.stringify(library.bookShelf));
   displayBooks(library.bookShelf);
});

function openForm() {
   if (!form.classList.contains("show-form")) {
      form.style.display = "block";
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
      setTimeout(() => {
         form.classList.add("show-form", "form");
      }, 1);
   }
}

function hideForm(){
   form.classList.add("fade-out");
   resetConfirm.classList.add("fade-out");
   overlay.style = "";
   document.body.style = "";
   setTimeout(() => {
      form.classList = "";
      resetConfirm.classList = "";
      form.style = "";
      resetConfirm.style = "";
      form.reset();
   }, 350);
}

function closeOnESC(event) {
   if (event.code === 'Escape') {
      if (form.classList.contains("show-form") || resetConfirm.classList.contains("show-form")) {
         hideForm();
      }  
   }
 }

 document.body.onkeydown = closeOnESC;
 