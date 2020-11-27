const titleValue = document.getElementById('title');
const authorValue = document.getElementById('author');
const pagesValue = document.getElementById('pages');
const dropdownValue = document.querySelector('#read');
const buttonValue = document.getElementById('submit');
const formValue = document.getElementById('form');
buttonValue.addEventListener('click', addBook);

function addBook() {
  new Book.title = Book.title + titleValue.value;
  console.log(new Book.title);
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

const Lotr = new Book(formValue)
Lotr.info ();