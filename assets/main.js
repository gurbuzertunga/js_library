let myLibrary = [];

let id = 0;
let bookWrapper = document.getElementById("books");
let titleValue = document.getElementById("title");
let authorValue = document.getElementById("author");
let pagesValue = document.getElementById("pages");
let dropdown = document.getElementById("read");
let dropdownValue = dropdown.options[dropdown.selectedIndex];
let buttonValue = document.getElementById("submit");
let bookList = document.getElementById('book-list');

const formValue = document.getElementById("form");
const getForm = document.getElementById("form-area");
getForm.style.display = "none";

const newBookBtn = document.getElementById("new-book");
newBookBtn.addEventListener("click", () => (getForm.style.display = "block"));

// const deleteButton = document.getElementById("delete");
// deleteButton.addEventListener("click", removeBook);

const closeForm = document.getElementById("close");
closeForm.addEventListener("click", () => (getForm.style.display = "none"));

formValue.addEventListener("submit", stopRefresh);
formValue.addEventListener("submit", clearFields());
buttonValue.addEventListener("click", addBook);
buttonValue.addEventListener("click", () => (getForm.style.display = "none"));

function stopRefresh(e) {
  e.preventDefault();
}

function selectChange() {
  dropdownValue = dropdown.options[dropdown.selectedIndex];
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
  displayBook(newBook);
  id++;
}

function displayBook(newBook) {
  const row = document.createElement('tr');
  bookList.appendChild(row);
  row.innerHTML = `
    <td>${newBook.title}</td>
    <td>${newBook.author}</td>
    <td>${newBook.pages}</td>
    <td>${newBook.read}</td>
    <td><a href="#" id="delete" class="delete">Delete Book</a></td>
  ` 
  
  // const deleteBookBtn = document.createElement('button');
  // deleteBookBtn.classList("text-blue-500");
  // bookWrapper.appendChild(deleteBookBtn);
  // bookWrapper.insertAdjacentHTML('afterbegin',`<li><button type="reset" id="delete">delete the book</button><li>`);
  // bookWrapper.insertAdjacentHTML('afterbegin',`<li class="text-blue-500" id="${id}">${newBook.read}</li>`);
  // bookWrapper.insertAdjacentHTML('afterbegin',`<li class="text-blue-500" id="${id}">${newBook.pages}</li>`);
  // bookWrapper.insertAdjacentHTML('afterbegin',`<li class="text-blue-500" id="${id}">${newBook.author}</li>`);
  // bookWrapper.insertAdjacentHTML('afterbegin',`<li class="text-blue-500" id="${id}">${newBook.title}</li>`);
  // removeBook(id);
  let deleteBtn = document.getElementById('delete');
  deleteBtn.addEventListener('click', alert('I have clicked you!!!!'));
}

function removeBook(item) {
  child = document.getElementById('item');
  element = myLibrary[item];
  elementId = myLibrary.indexOf(element);
  myLibrary.splice(elementId, 1);
  bookWrapper.removeChild(child);
}

bookList.addEventListener('click', (e) => {
  console.log(e.target);
})

function deleteBook(el) {
  if (el.classList.contains('delete')) {
    el.parentElement.parentElement.remove();
  }
}

function clearFields() {
  titleValue.value = '';
  authorValue.value = '';
  pagesValue.value = '';
  dropdown.value = '';
}


