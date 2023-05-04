const { Router } = require("express");
const ProductManager = require("../ProductManager");

const product = new ProductManager("../DB.json");
const router = Router();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  const productos = await product.getProducts();
  if (!limit) {
    return res.send({
      estado: "éxito",
      productos,
    });
  }
  return res.send({
    estado: "éxito",
    productos: productos.slice(0, limit),
  });
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productoDb = await product.getProductById(parseInt(pid));
  if (!productoDb) {
    return res.send({
      estado: "error",
      error: "producto no encontrado",
    });
  }
  res.send({ productoDb });
});

router.post("/", async (req, res) => {
  const producto = req.body;
  console.log(producto);
  const agregado = await product.addProduct(producto);
  if (!agregado) {
    return res
      .status(400)
      .send({ estado: "error", mensaje: "no se pudo agregar producto" });
  }
  res.status(200).send({ estado: "éxito", mensaje: "producto agregado" });
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const nuevoProducto = req.body;
  const productoActualizado = await product.updateProduct(parseInt(pid), nuevoProducto);

  if (!productoActualizado) return res.status(400).send("no se pudo actualizar el producto");
  res.status(200).send("actualizado");
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productoEliminado = await product.deleteProduct(parseInt(pid));

  if (productoEliminado !== undefined) {
    res.status(200).send("eliminado");
  } else {
    res.status(400).send("no se pudo eliminar el producto");
  }
});

module.exports = router;