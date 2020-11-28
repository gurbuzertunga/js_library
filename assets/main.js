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
  let newBook = new Book(
    titleValue.value,
    authorValue.value,
    pagesValue.value,
    dropdownValue.textContent
  );
  console.log(newBook);
  myLibrary.push(newBook);
  // console.log(myLibrary);
  bookWrapper.insertAdjacentHTML('afterbegin',`<li class="text-blue-500">${newBook.title}</li>`)
  bookWrapper.insertAdjacentHTML('afterbegin',`<li class="text-blue-500">${newBook.author}</li>`)
  bookWrapper.insertAdjacentHTML('afterbegin',`<li class="text-blue-500">${newBook.pages}</li>`)
  bookWrapper.insertAdjacentHTML('afterbegin',`<li class="text-blue-500">${newBook.read}</li>`)
}

function selectChange() {
  dropdownValue = dropdown.options[dropdown.selectedIndex];
}
