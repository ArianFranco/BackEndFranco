const { Router } = require("express");
const CartManager = require("../CartManager");

const cart = new CartManager("cart.json");
const router = Router();

router.post("/api/carts", async (req, res) => {
  cart.createCart();
  return res.status(200).send({ status: "exito" });
});

router.get("/api/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cartProduct = await cart.getProducts(cid);
  return res.status(200).send(cartProduct);
});

router.post("/api/carts/:cid/productos/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const addedProduct = await cart.addProduct(cid, pid, quantity);
  return res.status(200).send(addedProduct);
});

module.exports = router;