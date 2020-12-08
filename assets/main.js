const titleValue = document.getElementById('title');
const authorValue = document.getElementById('author');
const pagesValue = document.getElementById('pages');
const dropdown = document.getElementById('read');
const buttonValue = document.getElementById('submit');
const bookList = document.getElementById('book-list');
const formValue = document.getElementById('form');
const getForm = document.getElementById('form-area');
const newBookBtn = document.getElementById('new-book');
const closeForm = document.getElementById('close');
const bookWrapper = document.getElementById('books');
let books;

const Store = (() => {
  const getBooksFromStore = () => {
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  };

  const addBookToStore = (book) => {
    books = Store.getBooksFromStore();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  };

  const removeBookFromStore = (title) => {
    books = Store.getBooksFromStore();
    books.forEach((book) => {
      if (book.title === title) {
        books.splice(books.indexOf(book), 1);
        localStorage.setItem('books', JSON.stringify(books));
      }
    });
  };

  const updateStoreElement = (books) => {
    localStorage.setItem('books', JSON.stringify(books));
  };

  return { 
    addBookToStore, getBooksFromStore, removeBookFromStore, updateStoreElement 
  };
})();

const myLibrary = Store.getBooksFromStore();
// [
//   {
//     title: 'Lord of The Rings',
//     author: 'J.R.R Tolkien',
//     pages: 784,
//     read: 'Read',
//   },
//   {
//     title: 'The Dark Tower',
//     author: 'Stephen King',
//     pages: 485,
//     read: 'Not Read',
//   },
// ];


let id = 0;
let dropdownValue = dropdown.options[dropdown.selectedIndex];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const Book1 = (title1, author1, pages1, read1) => {
  const getTitle = title1;
  const getAuthor = author1;
  const getPages = pages1;
  const getRead = read1;
  return {getTitle, getAuthor, getPages, getRead};
}

console.log(titleValue.value);

const book1 = Book1(titleValue.value, authorValue.value, pagesValue.value, dropdownValue.textContent);
console.log(book1.getTitle);
console.log(book1.getAuthor);
console.log(book1.getPages);
console.log(book1.getRead);

console.log(book1);

function changeReadStatus(checkbox) {
  const targetTd = checkbox.parentElement.previousElementSibling.previousElementSibling;
  const refId = checkbox.id;
  if (checkbox.checked) {
    myLibrary[refId].read = 'Read';
    books[refId].read = 'Read';
    Store.updateStoreElement(books);
    targetTd.textContent = 'Read';
  } else {
    myLibrary[refId].read = 'Not Read';
    books[refId].read = 'Not Read';
    Store.updateStoreElement(books);
    targetTd.textContent = 'Not Read';
  }
}


function displayBook(newBook) {
  id = myLibrary.indexOf(newBook);
  const row = document.createElement('tr');
  bookList.appendChild(row);
  row.innerHTML = `
    <td class="border border-black py-1">${newBook.getTitle}</td>
    <td class="border border-black py-1">${newBook.getAuthor}</td>
    <td class="border border-black py-1">${newBook.getPages}</td>
    <td class="read border border-black py-1" id="${id}read">${newBook.getRead}</td>
    <td class="border border-black py-1 text-center"><a href="#" id="delete" class="delete bg-red-800 px-2 text-white py-1 rounded">Delete Book</a></td>
    <td class="border border-black py-1 text-center"><input class="my-auto" type="checkbox" name="checkbox" id='${id}'></td>
    `;

  const checkBox = document.getElementById(id);
  checkBox.addEventListener('click', (e) => changeReadStatus(e.target));

  if (myLibrary[id].read === 'Read') {
    checkBox.setAttribute('checked', true);
  }
}

function addBook() {
  if (titleValue.value === '' || authorValue.value === '' || pagesValue.value === '') {
    const alertMessage = document.createElement('div');
    document.body.insertBefore(alertMessage, bookWrapper);
    alertMessage.className = 'w-64 bg-red-800 text-white relative bottom-0 text-center text-lg mx-auto border-2 border-black rounded alert';
    alertMessage.textContent = 'You need to fill the form!';
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2000);
  } else {
    const newBook = Book1(
      titleValue.value,
      authorValue.value,
      pagesValue.value,
      dropdownValue.textContent,
    );
    myLibrary.push(newBook);
    Store.addBookToStore(newBook);
    displayBook(newBook);
  }
}


function deleteBook(el) {
  if (el.classList.contains('delete')) {
    const targetElement = el.parentElement.parentElement;
    targetElement.remove();
  }
}

function displayFormOnClick() {
  getForm.style.display = 'block';
  newBookBtn.style.display = 'none';
}

function hideFormOnClick() {
  getForm.style.display = 'none';
  newBookBtn.style.display = 'block';
}

function stopRefresh(e) {
  e.preventDefault();
  titleValue.value = '';
  authorValue.value = '';
  pagesValue.value = '';
}

function selectChange() {
  dropdownValue = dropdown.options[dropdown.selectedIndex];
}


getForm.style.display = 'none';
newBookBtn.addEventListener('click', displayFormOnClick);
closeForm.addEventListener('click', hideFormOnClick);

formValue.addEventListener('submit', stopRefresh);
buttonValue.addEventListener('click', addBook);
buttonValue.addEventListener('click', hideFormOnClick);
dropdown.addEventListener('click', selectChange);

bookList.addEventListener('click', (e) => {
  deleteBook(e.target);
  const titleRef = e.target.parentElement.parentElement.childNodes[1].textContent;
  Store.removeBookFromStore(titleRef);
});

myLibrary.forEach((book) => {
  document.addEventListener('DOMContentLoaded', displayBook(book));
});