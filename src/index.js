// 1. IMPORTACIONES
require("dotenv").config();
const express = require("express");
const { dbConnection } = require("./database/config")
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

dbConnection();

// 2.MIDDLEWARES
app.use(cors());
app.use(express.json());

// 3. RUTAS
app.get("/", (req, res) => {
    return res.json({
        msg: "Bienvenido al API de ING3NIO",
        autor: process.env.AUTOR,
    });
});
 app.use("/users", require("./routes/users.routes"));
 app.use("/episodes", require("./routes/episodes.routes"));
 app.use("/carts", require("./routes/carts.routes"));


// 4. SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor en linea en el puerto ${PORT}`);
});
