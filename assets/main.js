let myLibrary = [];
let bookWrapper = document.getElementById("books");
let titleValue = document.getElementById("title");
let authorValue = document.getElementById("author");
let pagesValue = document.getElementById("pages");
let dropdown = document.getElementById("read");
let dropdownValue = dropdown.options[dropdown.selectedIndex];
let buttonValue = document.getElementById("submit");
const formValue = document.getElementById("form");
const getForm = document.getElementById("form-area");
getForm.style.display = "none";

const newBookBtn = document.getElementById("new-book");
newBookBtn.addEventListener("click", () => (getForm.style.display = "block"));

const closeForm = document.getElementById("close");
closeForm.addEventListener("click", () => (getForm.style.display = "none"));

formValue.addEventListener("submit", stopRefresh);
buttonValue.addEventListener("click", addBook);

function stopRefresh(e) {
  e.preventDefault();
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    console.log(
      this.title +
        " by " +
        this.author +
        ", " +
        this.pages +
        " pages, " +
        this.read
    );
  };
}

function addBook() {
  getForm.style.display = "none";
  let newBook = new Book(
    titleValue.value,
    authorValue.value,
    pagesValue.value,
    dropdownValue.textContent
  );
  console.log(newBook);
  myLibrary.push(newBook);
  // console.log(myLibrary);
  for (let i = 0; i < myLibrary.length; i++) {
    displayBooks(myLibrary[i]);
  }
}

function displayBooks(book) {
  bookWrapper.setAttribute("id", myLibrary.indexOf(book));
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let p3 = document.createElement("p");
  let p4 = document.createElement("p");

  p1.textContent = book.title;
  bookWrapper.appendChild(p1);
  p2.textContent = book.author;
  bookWrapper.appendChild(p2);
  p3.textContent = book.pages;
  bookWrapper.appendChild(p3);
  p4.textContent = book.read;
  bookWrapper.appendChild(p4);
}
