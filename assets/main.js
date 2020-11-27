function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read)
  }
}

const Lotr = new Book('LOTR', 'Tolkien', 850, 'not read yet')