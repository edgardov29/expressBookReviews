const axios = require("axios");

// Obtiene todos los libros
async function getBooks() {
  const response = await axios.get("http://localhost:5000/");
  return response.data;
}

// Obtiene libro por ISBN
async function getBooksByISBN(isbn) {
  const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
  return response.data;
}

// Obtiene libros por autor
async function getBooksByAuthor(author) {
  const response = await axios.get(`http://localhost:5000/author/${author}`);
  return response.data;
}

// Obtiene libros por título
async function getBookByTitle(title) {
  const response = await axios.get(`http://localhost:5000/title/${title}`);
  return response.data;
}

module.exports = { getBooks, getBooksByISBN, getBooksByAuthor, getBookByTitle };
