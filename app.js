// Book constructor
function Book(title, auther, isbn) {
    this.title = title;
    this.auther = auther;
    this.isbn = isbn;
}

// UI constructor
function UI() {}

const title = document.getElementById('title'),
    auther = document.getElementById('auther'),
    isbn = document.getElementById('isbn');

// Prototype Functions
UI.prototype.addBookToStorage = function(book) {
    let books;
    // Setting Array
    if (localStorage.getItem('books') == null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    // Add New Book
    books.push(book);
    
    // Update LocalStorage
    localStorage.setItem('books', JSON.stringify(books));
}

UI.prototype.addBookToList = function(book) {
    // Create tr Element
    const row = document.createElement('tr');

    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.auther}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    //Append To Parent
    document.getElementById('book-list').appendChild(row);
    ui.clearForm();
}

UI.prototype.createAlert = function(msg, className) {
    const div = document.createElement('div');
    div.className = className;
    div.textContent = msg;
    div.style.animation = 'fade-in .5s ease-in';

    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');

    container.insertBefore(div, form);

    setTimeout(function() {
        div.style.animation = 'fade-out .5s ease-out';
        setTimeout(function() {
            div.remove();
        }, 495);
    }, 2500);
}

UI.prototype.loadList = function() {
    const books = JSON.parse(localStorage.getItem('books'));

    if (books != null) {
        books.forEach(function(book) {
            ui.addBookToList(book);
        });
    }
}

UI.prototype.clearForm = function() {
    title.value = '';
    auther.value = '';
    isbn.value = '';
}

UI.prototype.isHere = function() {
    const books = JSON.parse(localStorage.getItem('books'));

    if (books != null) {
        for (let i = 0; i < books.length; i++) {
            if (books[i].title == title.value) {
                return false;
            }
        }
    }
    return true;
}

UI.prototype.deleteRow = function(row) {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books != null) {
        for (let i = 0; i < books.length; i++) {
            if (books[i].title == row.firstElementChild.textContent) {
                books.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('books', JSON.stringify(books));
        row.remove();
    }
}

// Instantiate UI
const ui = new UI();

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    ui.loadList();
});

document.getElementById('book-form').addEventListener('submit', function(e) {
    const book = new Book(title.value, auther.value, isbn.value);

    if (ui.isHere()){
        ui.addBookToStorage(book);
        ui.addBookToList(book);
        ui.createAlert('Added Book!', 'success');
    } else {
        ui.createAlert('Book already added!', 'error');
        ui.clearForm();
    }

    e.preventDefault();
});

const list = document.querySelector('#book-list');

list.addEventListener('click', function(e) {
    if (e.target.className == 'delete') {
        const row = e.target.parentElement.parentElement;
        ui.deleteRow(row);
        e.preventDefault();
    }
});