const express = require("express");
const books = require("./booksdb.js");
const { getBooks, getBooksByISBN, getBooksByAuthor, getBookByTitle } = require("../services_books");
const public_users = express.Router();

// Rutas usando las funciones importadas
public_users.get("/", async (req, res) => {
  try {
    const data = await getBooks();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la lista de libros" });
  }
});

public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const data = await getBooksByISBN(req.params.isbn);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Libro no encontrado" });
  }
});

public_users.get("/author/:author", async (req, res) => {
  try {
    const data = await getBooksByAuthor(req.params.author);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "No se encontraron libros de ese autor" });
  }
});

public_users.get("/title/:title", async (req, res) => {
  try {
    const data = await getBookByTitle(req.params.title);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "No se encontró el título" });
  }
});

module.exports.general = public_users;
