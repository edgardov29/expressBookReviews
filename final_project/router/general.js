const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books, null, 2))
    //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn
    let book = books[isbn]

    if (book){
        res.json(books[isbn])
    }else{
        res.status(404).json({message: "Libro no encontrado."})
    }
    
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    let author = req.params.author;
    let keys = Object.keys(books);
    let results = [];

    keys.forEach(key => {
        let book = books[key];
        if (book.author === author) {
            results.push(book);
        }
    });

    if (results.length > 0) {
        res.json(results);
    } else {
        res.status(404).json({ message: "No se encontraron libros de ese autor" });
    }
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title
    let keys = Object.keys(books)
    let results = []

    keys.forEach(key => {
        let book = books[key]
        if (book.title === title){
            results.push(book)
        }
    })
    if (results.length > 0){
        res.json(results)
    }else{
        res.status(404).json({message: "No se encontro el titulo"})
    }

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
