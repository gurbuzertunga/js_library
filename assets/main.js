const bookWrapper = document.getElementById("books");
const titleValue = document.getElementById("title");
const authorValue = document.getElementById("author");
const pagesValue = document.getElementById("pages");
const dropdown = document.getElementById("read");
const buttonValue = document.getElementById("submit");
const bookList = document.getElementById('book-list');
const formValue = document.getElementById("form");
const getForm = document.getElementById("form-area");
const newBookBtn = document.getElementById("new-book");
const closeForm = document.getElementById("close");


let dropdownValue = dropdown.options[dropdown.selectedIndex];
let myLibrary = [];
let id = 0;
let index = 0;

getForm.style.display = "none";
newBookBtn.addEventListener("click", () => (getForm.style.display = "block"));
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
 
}

function displayBook(newBook) {
  
  const row = document.createElement('tr');
  bookList.appendChild(row);
  row.innerHTML = `
    <td>${newBook.title}</td>
    <td>${newBook.author}</td>
    <td>${newBook.pages}</td>
    <td class="read" id="read">${newBook.read}</td>
    <td><a href="#" id="delete" class="delete">Delete Book</a></td>
    <td><input type="checkbox" name="checkbox" id='${id}'></td>
    `

      let checkBox = document.getElementById(id);
      checkBox.addEventListener('click', (e) => changeReadStatus(e.target));

 if (myLibrary[id].read === "Read") {
    checkBox.setAttribute('checked', true);
   }
  //  changeReadStatus();

}

function changeReadStatus(checkbox) {
    let str;
    if (checkbox.checked) {
      //  str = "This is checked";
      myLibrary[id].read == "Not Read";
    } else {
      // str = "This is not checked.";
      myLibrary[id].read == "Read";
    }
    id++;
    // console.log(str);
  // let checkBox = document.getElementById(id);
  // checkBox.addEventListener('click', (e) => console.log(e.target));

  // let checkTarget = checkBox.parentElement.parentElement;
  // console.log(checkTarget);
   
  //    console.log(myLibrary[0])
   
    // if (newBook.read.textContent = "Read") {
    //   checkBox.checked = true;
    // } else  if (newBook.read.textContent = "Not Read"){
    //   checkBox.checked = false;
    // }
}

bookList.addEventListener('click', function (e) {
 deleteBook(e.target);
});

function deleteBook(el) {
  if (el.classList.contains('delete')) {
    let targetElement = el.parentElement.parentElement;
    targetElement.remove();
    myLibrary.splice(myLibrary.indexOf(targetElement), 1);
  }
}

function clearFields() {
  titleValue.value = '';
  authorValue.value = '';
  pagesValue.value = '';
  dropdown.value = '';
}


