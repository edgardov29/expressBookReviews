const express = require('express');              // Importa el framework Express
const jwt = require('jsonwebtoken');             // Importa la librería para manejar JSON Web Tokens
const session = require('express-session')       // Importa la librería para manejar sesiones
const customer_routes = require('./router/auth_users.js').authenticated; // Importa las rutas de clientes autenticados
const genl_routes = require('./router/general.js').general;              // Importa las rutas generales

const app = express();                           // Crea la aplicación Express

app.use(express.json());                         // Middleware para parsear JSON en las peticiones

// Configura sesiones para las rutas bajo "/customer"
app.use("/customer", session({
    secret: "fingerprint_customer",              // Clave secreta para firmar la sesión
    resave: true,                                // Fuerza a guardar la sesión incluso si no hubo cambios
    saveUninitialized: true                      // Guarda sesiones nuevas aunque estén vacías
}))

// Middleware de autenticación para rutas bajo "/customer/auth/*"
app.use("/customer/auth/*", function auth(req, res, next) {
    if (req.session.authorization){
        let token = req.session.authorization["accessToken"]

        jwt.verify(token, secret, (err, user)=>{
            if (!err){
                req.user = user
            }else{
                return res.status(403).json({message: "User no authenticated"})
            }
        })
    }
});

const PORT = 5000;                               // Define el puerto del servidor

// Usa las rutas de clientes autenticados bajo "/customer"
app.use("/customer", customer_routes);

// Usa las rutas generales bajo "/"
app.use("/", genl_routes);

// Inicia el servidor en el puerto definido
app.listen(PORT, () => console.log("Server is running"));
