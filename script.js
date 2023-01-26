function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

Book.prototype.info = function () {
  console.log(
    `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`
  );
};

Book.prototype.read = function () {
  read.checked === true ? (read = 'Read') : (read = 'Not Read Yet');
};

/////////////
// Variables
/////////////
let myLibrary = [
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310, read: 'Read' },
  {
    title: 'Catcher in the Rye',
    author: 'J.D. Saliger',
    pages: 234,
    read: 'Not Read Yet',
  },
  {
    title: 'Title',
    author: 'Author',
    pages: 'Pages',
    read: 'Read',
  },
];
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readStatus = document.getElementById('readStatus');
const error = document.querySelector('.error');
const bookshelf = document.querySelector('.bookshelf');
const overlay = document.querySelector('.overlay');
const cardRead = document.querySelector('.card-read');

const addBookBtn = document.getElementById('submit');
const addNewBookBtn = document.getElementById('addNewBook');

//////////////
// Functions
//////////////
function addBook() {
  let userBook = new Book(
    titleInput.value,
    authorInput.value,
    +pagesInput.value,
    readStatus.checked ? 'Read' : 'Not Read Yet'
  );

  console.log(userBook);
  myLibrary.push(userBook);

  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  readStatus.checked = false;
}

function displayBookshelf() {
  bookshelf.innerHTML = '';

  myLibrary.forEach((book) => {
    const createCard = document.createElement('div');
    createCard.classList.add('card');
    createCard.innerHTML = `
    <img src="" alt="placeholder" class="img" />
    <span class="card-title">${book.title}</span>
    <span class="card-author">${book.author}</span>
    <span class="card-pages">${book.pages}</span>
    <span class="card-read">${book.read}</span>
    <button class="removeBook">Remove</button>`;

    if (book.read === 'Not Read Yet') {
      createCard.querySelector('.card-read').style.backgroundColor =
        'rgb(91, 205, 163)';
    } else {
      createCard.querySelector('.card-read').style.backgroundColor =
        'rgb(205, 91, 133)';
    }

    bookshelf.appendChild(createCard);
  });
}

displayBookshelf();

// function removeBook(book) {
//   const indexOfBookToRemove = myLibrary.findIndex(
//     ({ title }) => title === book
//   );

//   myLibrary.splice(indexOfBookToRemove, 1);

//   displayBookshelf();
// }

function toggleReadStatus(book) {
  book.style.backgroundColor = '';
  if (book.innerText === 'Read') {
    book.innerText = 'Not Read Yet';
    book.style.backgroundColor = 'rgb(91, 205, 163)';
  } else if (book.innerText === 'Not Read Yet') {
    book.innerText = 'Read';
    book.style.backgroundColor = 'rgb(205, 91, 133)';
  }
}

//////////
// Events
//////////
addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (!titleInput.value || !authorInput.value || !pagesInput.value) {
    error.innerHTML = '<p>Please enter book information</p>';
  } else {
    error.innerHTML = '';
    addBook(this);
    overlay.setAttribute('hidden', '');
    console.log(e.target);
    toggleReadStatus(e.target);
    displayBookshelf();
  }
});

bookshelf.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('card-read')) {
    toggleReadStatus(e.target);
  }

  if (e.target.classList.contains('removeBook')) {
    const targetBookTitle =
      e.target.parentNode.querySelector('.card-title').innerText;
    const indexOfBookToRemove = myLibrary.findIndex(
      ({ title }) => title === targetBookTitle
    );

    myLibrary.splice(indexOfBookToRemove, 1);
    displayBookshelf();
  }
});

addNewBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.removeAttribute('hidden');
});

overlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('close')) {
    overlay.setAttribute('hidden', 'true');
  }
});
