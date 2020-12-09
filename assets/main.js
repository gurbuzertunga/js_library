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
      if (book.getTitle === title) {
        books.splice(books.indexOf(book), 1);
        localStorage.setItem("books", JSON.stringify(books));
      }
    });
  };

  const updateStoreElement = (books) => {
    localStorage.setItem('books', JSON.stringify(books));
  };

  return {
    addBookToStore,
    getBooksFromStore,
    removeBookFromStore,
    updateStoreElement,
  };
})();

const myLibrary = Store.getBooksFromStore();

let id = 0;
let dropdownValue = dropdown.options[dropdown.selectedIndex];

const Book = (title, author, pages, read) => {
  const getTitle = title;
  const getAuthor = author;
  const getPages = pages;
  const getRead = read;
  return {
    getTitle,
    getAuthor,
    getPages,
    getRead,
  };
};

class myMethods {
  static changeReadStatus = (checkbox) => {
    const targetTd =
      checkbox.parentElement.previousElementSibling.previousElementSibling;
    const refId = checkbox.id;
    if (checkbox.checked) {
      books[refId].getRead = 'Read';
      Store.updateStoreElement(books);
      targetTd.textContent = 'Read';
    } else {
      books[refId].getRead = 'Not Read';
      Store.updateStoreElement(books);
      targetTd.textContent = 'Not Read';
    }
  };

  static displayBook = (newBook) => {
    id = books.indexOf(newBook);
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
    checkBox.addEventListener('click', (e) =>
      myMethods.changeReadStatus(e.target)
    );

    if (books[id].getRead === 'Read') {
      checkBox.setAttribute('checked', true);
    }
  };
}

function addBook() {
  if (
    titleValue.value === '' ||
    authorValue.value === '' ||
    pagesValue.value === ''
  ) {
    const alertMessage = document.createElement('div');
    document.body.insertBefore(alertMessage, bookWrapper);
    alertMessage.className =
      'w-64 bg-red-800 text-white relative bottom-0 text-center text-lg mx-auto border-2 border-black rounded alert';
    alertMessage.textContent = 'You need to fill the form!';
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2000);
  } else {
    const newBook = Book(
      titleValue.value,
      authorValue.value,
      pagesValue.value,
      dropdownValue.value
    );
    Store.addBookToStore(newBook);
    myMethods.displayBook(newBook);
  }
}

const generalFunctions = (() => {
  const deleteBook = (el) => {
    if (el.classList.contains('delete')) {
      const targetElement = el.parentElement.parentElement;
      targetElement.remove();
      const titleRef = el.parentElement.parentElement.childNodes[1].textContent;
      Store.removeBookFromStore(titleRef);
    }
  };

  const displayFormOnClick = () => {
    getForm.style.display = 'block';
    newBookBtn.style.display = 'none';
  };

  const hideFormOnClick = () => {
    getForm.style.display = 'none';
    newBookBtn.style.display = 'block';
  };

  const stopRefresh = (e) => {
    e.preventDefault();
    titleValue.value = '';
    authorValue.value = '';
    pagesValue.value = '';
  };

  const selectChange = () => {
    dropdownValue = dropdown.options[dropdown.selectedIndex];
  };

  return {
    selectChange,
    stopRefresh,
    hideFormOnClick,
    displayFormOnClick,
    deleteBook,
  };
})();

getForm.style.display = 'none';
newBookBtn.addEventListener('click', generalFunctions.displayFormOnClick);
closeForm.addEventListener('click', generalFunctions.hideFormOnClick);

formValue.addEventListener('submit', generalFunctions.stopRefresh);
buttonValue.addEventListener('click', addBook);
buttonValue.addEventListener('click', generalFunctions.hideFormOnClick);
dropdown.addEventListener('onChange', generalFunctions.selectChange);

bookList.addEventListener('click', (e) => {
  generalFunctions.deleteBook(e.target);
});

myLibrary.forEach((book) => {
  document.addEventListener('DOMContentLoaded', myMethods.displayBook(book));
});
