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
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  };

  const addBookToStore = (book) => {
    books = Store.getBooksFromStore();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  };

  const removeBookFromStore = (title) => {
    books = Store.getBooksFromStore();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  };

  const updateStoreElement = (books) => {
    localStorage.setItem("books", JSON.stringify(books));
  };
  return {getBooksFromStore, addBookToStore, removeBookFromStore, updateStoreElement};
})();

const myLibrary = Store.getBooksFromStore();

let id = 0;
let dropdownValue = dropdown.options[dropdown.selectedIndex];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
console.log(this);

function changeReadStatus(checkbox) {
  const targetTd =
    checkbox.parentElement.previousElementSibling.previousElementSibling;
  const refId = checkbox.id;
  if (checkbox.checked) {
    myLibrary[refId].read = "Read";
    books[refId].read = "Read";
    Store.updateStoreElement(books);
    targetTd.textContent = "Read";
  } else {
    myLibrary[refId].read = "Not Read";
    books[refId].read = "Not Read";
    Store.updateStoreElement(books);
    targetTd.textContent = "Not Read";
  }
}

function displayBook(newBook) {
  id = myLibrary.indexOf(newBook);
  const row = document.createElement("tr");
  bookList.appendChild(row);
  row.innerHTML = `
    <td class="border border-black py-1">${newBook.title}</td>
    <td class="border border-black py-1">${newBook.author}</td>
    <td class="border border-black py-1">${newBook.pages}</td>
    <td class="read border border-black py-1" id="${id}read">${newBook.read}</td>
    <td class="border border-black py-1 text-center"><a href="#" id='${id}del' class="delete bg-red-800 px-2 text-white py-1 rounded">Delete Book</a></td>
    <td class="border border-black py-1 text-center"><input class="my-auto" type="checkbox" name="checkbox" id='${id}'></td>
    `;

  const checkBox = document.getElementById(id);
  checkBox.addEventListener("click", (e) => changeReadStatus(e.target));

  if (myLibrary[id].read === "Read") {
    checkBox.setAttribute("checked", true);
  }
  const delBtn = document.getElementById(id + 'del');
  delBtn.addEventListener('click', e => deleteBook(e.target));
}

function addBook() {
  const newBook = new Book(
    titleValue.value,
    authorValue.value,
    pagesValue.value,
    dropdownValue.textContent
  );
  myLibrary.push(newBook);
  Store.addBookToStore(newBook);
  displayBook(newBook);
}

function deleteBook(el) {
  if (el.classList.contains("delete")) {
    const targetElement = el.parentElement.parentElement;
    targetElement.remove();
    console.log(myLibrary.indexOf(targetElement));
    myLibrary.splice(myLibrary.indexOf(targetElement), 1);
  }
}

function displayFormOnClick() {
  getForm.style.display = "block";
  newBookBtn.style.display = "none";
}

function hideFormOnClick() {
  getForm.style.display = "none";
  newBookBtn.style.display = "block";
}

function stopRefresh(e) {
  e.preventDefault();
  titleValue.value = "";
  authorValue.value = "";
  pagesValue.value = "";
}

function selectChange() {
  dropdownValue = dropdown.options[dropdown.selectedIndex];
}

getForm.style.display = "none";
newBookBtn.addEventListener("click", displayFormOnClick);
closeForm.addEventListener("click", hideFormOnClick);

formValue.addEventListener("submit", stopRefresh);
buttonValue.addEventListener("click", addBook);
buttonValue.addEventListener("click", hideFormOnClick);
dropdown.addEventListener("click", selectChange);

bookList.addEventListener("click", (e) => {
  deleteBook(e.target)
  console.log(e.target)
  let titleRef = e.target.parentElement.parentElement.childNodes[1].textContent;
  console.log(titleRef);
  Store.removeBookFromStore(titleRef);
});

myLibrary.forEach((book) => {
  document.addEventListener("DOMContentLoaded", displayBook(book));
});
