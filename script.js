const myLibrary = []
let idCounter = 0

// Object constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = parseInt(pages)
    this.read = read
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
    this.id = idCounter
    idCounter += 1
}

Book.prototype.toggleRead = function() {
    this.read = !this.read
}

function toggleRead(index) {
    myLibrary[index].toggleRead()
    updateList()
    console.log(myLibrary)
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true)

const grapesOfWrath = new Book("The Grapes of Wrath", "John Steinbeck", 516, false)

const conquistadora = new Book("Conquistadora", "Esmeralda Santiaga", 495, true)

const animalFarm = new Book("Animal Farm", "George Orwell", 218, false)

myLibrary.push(theHobbit, grapesOfWrath, conquistadora, animalFarm)

function removeBook(bookIndex) {
    myLibrary.splice(bookIndex, 1)
    updateList()
    console.log(myLibrary)
}

// Remove Data attribute event listner:
document.addEventListener('click', (e) => {
    if (e.target.dataset.remove) {
        removeBook(e.target.dataset.remove)
    } 
})

function updateList() {
    const updatedLibrary = document.getElementById('books').innerHTML = ""

    myLibrary.forEach(book => {
        updatedLibrary.innerHTML += getBookHtml(book)
    })
}

function getBookHtml(book) {
    const displayedBook = document.createElement('div')
    displayedBook.style.border = '1px solid blue'
    displayedBook.textContent = book.title

    displayedBook.innerHTML += `
        <button id="remove-btn" data-remove="${myLibrary.indexOf(book)}">Remove</button>
        <button id="read-btn" onclick="toggleRead(${myLibrary.indexOf(book)})">${book.read ? 'Read' : 'Not read yet'}</button>
    `

    document.getElementById('books').append(displayedBook)
}

//take user's input and store new book objects into array
function addBookToLibrary() {
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let pages = document.getElementById('pages').value
    let read = document.getElementById('read').checked
    const newBook = new Book(title, author, pages, read)

    myLibrary.push(newBook)
    updateList()
    console.log(myLibrary)
}

function displayForm() {
    document.querySelector('form').style.display = 'block'
}

function handleSubmission(e) {
    e.preventDefault()
    addBookToLibrary()
    document.querySelector('form').reset()
}

document.getElementById('new-book').addEventListener('click', displayForm)
document.querySelector('form').addEventListener('submit', handleSubmission)

updateList()

