const express = require("express");
const router = express.Router();
const productos = require('../DB.json');
const { checkAdmin } = require("../utils");

router.get("/productos/listar", async (req, res) => {
  try {
    const prods = await productos.listar();
    if (prods.length === 0) {
      res.status(404).json({ error: "no hay productos cargados" });
    } else {
      res.status(200).json(prods);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/productos/listar/:id", async (req, res) => {
  try {
    const producto = await productos.listarPorId(req.params.id);
    if (!producto) {
      res.status(404).json({ error: "producto no encontrado" });
    } else {
      res.status(200).json(producto);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/productos/guardar", checkAdmin, async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) {
      return res.status(400).json({ error: "faltan datos" });
    }
    const prod = await productos.guardar(title, price, thumbnail);
    res.status(201).json(prod);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put("/productos/actualizar/:id", checkAdmin, async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) {
      return res.status(400).json({ error: "faltan datos" });
    }
    const prod = await productos.actualizar(
      req.params.id,
      title,
      price,
      thumbnail
    );
    if (!prod) {
      res.status(404).json({ error: "producto no encontrado" });
    } else {
      res.status(200).json(prod);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/productos/borrar/:id", checkAdmin, async (req, res) => {
  try {
    const prod = await productos.borrar(req.params.id);
    if (!prod) {
      res.status(404).json({ error: "producto no encontrado" });
    } else {
      res.status(200).json(prod);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;