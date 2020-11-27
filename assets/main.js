let myLibrary = [];
let bookWrapper = document.getElementById("books");
let titleValue = document.getElementById("title");
let authorValue = document.getElementById("author");
let pagesValue = document.getElementById("pages");
let dropdown = document.getElementById("read");
let dropdownValue = dropdown.options[dropdown.selectedIndex];
let buttonValue = document.getElementById("submit");
const formValue = document.getElementById("form");
formValue.addEventListener("submit", stopRefresh);
buttonValue.addEventListener("click", addBook);
let p1 = document.createElement("p");
let p2 = document.createElement("p");
let p3 = document.createElement("p");
let p4 = document.createElement("p");

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
    p1.innerHTML = myLibrary[i].title;
    p2.innerHTML = myLibrary[i].author;
    p3.innerHTML = myLibrary[i].pages;
    p4.innerHTML = myLibrary[i].read;

    bookWrapper.appendChild(p1);
    bookWrapper.appendChild(p2);
    bookWrapper.appendChild(p3);
    bookWrapper.appendChild(p4);
  }
}
