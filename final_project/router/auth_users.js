const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
    return users.some(u => u.username === username && u.password === password);
}
//only registered users can login
regd_users.post("/login", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({message: "Falta usuario o contraseña"});   
    }

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({message: "Usuario o contraseña inválidos"});
    } else {
        let accessToken = jwt.sign(
            { username: username },   // payload
            "clave_secreta",          // clave secreta (puedes ponerla en env)
            { expiresIn: "1h" }       // opciones
        );

        req.session.authorization = { accessToken, username };
        return res.status(200).json({message: "Login exitoso", token: accessToken});
    }
});


// Add a book review
// Add a book review
// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review; // Se obtiene de la consulta (URL?review=...)
    
    // El nombre de usuario viene del middleware de autenticación (req.user)
    // que a su vez se extrajo del token almacenado en la sesión
    const username = req.user.username; 

    // Verificamos si el libro existe en nuestra base de datos
    if (books[isbn]) {
        let book = books[isbn];
        
        if (review) {
            // Esta línea cumple la lógica solicitada:
            // Si 'username' ya existe en 'reviews', se sobreescribe (modifica).
            // Si no existe, se crea una nueva entrada para ese usuario.
            book.reviews[username] = review;
            
            return res.status(200).json({
                message: "Reseña añadida/actualizada correctamente",
                reviews: books[isbn].reviews
              });

        } else {
            return res.status(400).json({message: "Debe proporcionar el texto de la reseña en la consulta (query parameter)."});
        }
    } else {
        return res.status(404).json({message: "Libro no encontrado."});
    }
});
regd_users.delete("/auth/review/:isbn", (req, res)=>{
    let isbn = req.params.isbn;
    let username = req.user.username;
    let book = books[isbn];

    if (book.reviews[username]) {
        delete book.reviews[username];
        res.status(200).json({message: "Reseña eliminada exitosamente"});
    } else {
        res.status(404).json({message: "No existe reseña para este usuario"});
    }
    
})


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;


