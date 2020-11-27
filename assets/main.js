let myLibrary = [];
let titleValue = document.getElementById('title');
let authorValue = document.getElementById('author');
let pagesValue = document.getElementById('pages');
let dropdown = document.getElementById('read');
let dropdownValue = dropdown.options[dropdown.selectedIndex];
let buttonValue = document.getElementById('submit');
const formValue = document.getElementById('form');
formValue.addEventListener('submit', stopRefresh);
buttonValue.addEventListener('click', addBook);

function stopRefresh(e) {
  e.preventDefault();
}

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read)
  }
}

function addBook() {
  let newBook = new Book(titleValue.value, authorValue.value, pagesValue.value, dropdownValue.textContent )
  console.log(newBook);
  myLibrary.push(newBook);
  console.log(myLibrary);
}
