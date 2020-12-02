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
const myLibrary = [
  {
    title: 'Lord of The Rings',
    author: 'J.R.R Tolkien',
    pages: 784,
    read: 'Read',
  },
  {
    title: 'The Dark Tower',
    author: 'Stephen King',
    pages: 485,
    read: 'Not Read',
  },
];


let id = 0;
let dropdownValue = dropdown.options[dropdown.selectedIndex];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function changeReadStatus(checkbox) {
  const targetTd = checkbox.parentElement.previousElementSibling.previousElementSibling;
  const refId = checkbox.id;
  if (checkbox.checked) {
    myLibrary[refId].read = 'Read';
    targetTd.textContent = 'Read';
  } else {
    myLibrary[refId].read = 'Not Read';
    targetTd.textContent = 'Not Read';
  }
}


function displayBook(newBook) {
  id = myLibrary.indexOf(newBook);
  const row = document.createElement('tr');
  bookList.appendChild(row);
  row.innerHTML = `
    <td class="border border-black py-1">${newBook.title}</td>
    <td class="border border-black py-1">${newBook.author}</td>
    <td class="border border-black py-1">${newBook.pages}</td>
    <td class="read border border-black py-1" id="${id}read">${newBook.read}</td>
    <td class="border border-black py-1 text-center"><a href="#" id="delete" class="delete bg-gray-800 px-2 py-1 rounded">Delete Book</a></td>
    <td class="border border-black py-1 text-center"><input class="my-auto" type="checkbox" name="checkbox" id='${id}'></td>
    `;

  const checkBox = document.getElementById(id);
  checkBox.addEventListener('click', (e) => changeReadStatus(e.target));

  if (myLibrary[id].read === 'Read') {
    checkBox.setAttribute('checked', true);
  }
}

function addBook() {
  const newBook = new Book(
    titleValue.value,
    authorValue.value,
    pagesValue.value,
    dropdownValue.textContent,
  );
  myLibrary.push(newBook);

  displayBook(newBook);
}


function deleteBook(el) {
  if (el.classList.contains('delete')) {
    const targetElement = el.parentElement.parentElement;
    targetElement.remove();
    myLibrary.splice(myLibrary.indexOf(targetElement), 1);
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
});

myLibrary.forEach((book) => {
  document.addEventListener('DOMContentLoaded', displayBook(book));
});
