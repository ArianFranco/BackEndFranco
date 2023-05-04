const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const { productsMock } = require("./utils");
const productsRouter = require("./routes/products");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials")
    })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/api/products", productsRouter);

io.on("connection", socket => {
    console.log("Nuevo cliente conectado!");

    socket.emit("products", productsMock);

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});

app.get("/", (req, res) => {
    res.render("home", { products: productsMock });
});

app.get("/realTimeProducts", (req, res) => {
    res.render("realTimeProducts", { products: productsMock });
});

app.post("/api/products", (req, res) => {
    const newProduct = {
        id: productsMock.length + 1,
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    };
    productsMock.push(newProduct);

    io.sockets.emit("products", productsMock);

    res.redirect("/");
});

app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;

    const deletedProduct = productsMock.find(product => product.id == id);
    productsMock = productsMock.filter(product => product.id != id);

    io.sockets.emit("products", productsMock);

    res.send(`Producto eliminado: ${JSON.stringify(deletedProduct)}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Algo salió mal!");
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});