// final_project/router/general.js

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");

/**
 * Registro de usuarios
 */
public_users.post("/register", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password){
        let exist = users.some(u => u.username === username);
        if (exist){
            res.status(409).json({message: `El usuario: ${username} ya está registrado.`});
        } else {
            users.push({username, password});
            res.status(200).json({message: "Usuario registrado exitosamente"});
        }
    } else {
        res.status(400).json({message: "Faltan datos de usuario o contraseña."});
    }
});

/**
 * Obtener todos los libros
 */
public_users.get('/', async (req, res) => {
    try {
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la lista de libros" });
    }
});

// Función con Axios para obtener todos los libros
async function getBooks() {
    try {
        const response = await axios.get("http://localhost:5000/");
        console.log(response.data);
    } catch (error) {
        console.log("Algo ha fallado:", error);
    }
}
// Llamada de prueba
getBooks();

/**
 * Obtener libro por ISBN
 */
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        if (books[isbn]) {
            res.status(200).json(books[isbn]);
        } else {
            res.status(404).json({message: "Libro no encontrado."});
        }
    } catch (error) {
        res.status(500).json({message: "Error al obtener libro por ISBN"});
    }
});

// Función con Axios para obtener libro por ISBN
async function getBooksByISBN(isbn){
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        console.log(response.data);
    } catch (error){
        console.log("Algo ha fallado:", error);
    }
}
// Llamada de prueba
getBooksByISBN(2);

/**
 * Obtener libros por Autor
 */
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const results = Object.values(books).filter(book => book.author === author);
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: "No se encontraron libros de ese autor" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener libros por autor" });
    }
});

// Función con Axios para obtener libros por autor
async function getBooksByAuthor(author){
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log(response.data);
    } catch (error){
        console.log("Algo ha fallado:", error);
    }
}
// Llamada de prueba
getBooksByAuthor("Chinua Achebe");

/**
 * Obtener libros por Título
 */
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const results = Object.values(books).filter(book => book.title === title);
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({message: "No se encontró el título"});
        }
    } catch (error) {
        res.status(500).json({message: "Error al obtener libros por título"});
    }
});

// Función con Axios para obtener libros por título
async function getBookByTitle(title) {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log(response.data);
    } catch (error) {
        console.log("Algo ha fallado:", error);
    }
}
// Llamada de prueba
getBookByTitle("Things Fall Apart");

/**
 * Obtener reseñas de un libro
 */
public_users.get('/review/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        if (books[isbn]) {
            res.status(200).json(books[isbn].reviews);
        } else {
            res.status(404).json({message: "No se encontró el libro."});
        }
    } catch (error) {
        res.status(500).json({message: "Error al obtener reseñas"});
    }
});

module.exports.general = public_users;
