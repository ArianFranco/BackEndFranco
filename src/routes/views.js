const express = require("express");
const router = express.Router();
const productos = require("../api/productos");
const { productosRandom } = require("../utils");
const { server: io } = require("../utils");

const mensajes = [];

router.get("/productos/vista", async (req, res) => {
  const prods = await productos.listar();
  const data = {
    productos: prods,
    hayProductos: prods.length,
  };
  res.render("layouts/main", { ...data, partials: { body: "home" } });
});

router.get("/productos/vista-test", async (req, res) => {
  const prods = productosRandom(10);
  const data = {
    productos: prods,
    hayProductos: prods.length,
  };
  res.render("layouts/main", { ...data, partials: { body: "home" } });
});

router.get("/chat", async (req, res) => {
  const data = {
    mensajes: mensajes,
  };
  res.render("layouts/main", { ...data, partials: { body: "chat" } });
});

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
});

router.get("/realtimeProducts", async (req, res) => {
  const prods = await productos.listar();
  const data = {
    productos: prods,
    hayProductos: prods.length,
  };
  res.render("layouts/main", { ...data, partials: { body: "realTimeProducts" } });
});

productos.addObserver((data) => {
  io.emit("productos", data);
});

module.exports = router;