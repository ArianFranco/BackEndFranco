const express = require('express');
const router = express.Router();
const Product = require('../dao/models/product');

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || '';
    const query = req.query.query || '';

    const skip = (page - 1) * limit;
    let products;

    if (query) {
      products = await Product.find({ title: { $regex: query, $options: 'i' } })
        .sort(sort === 'desc' ? { price: -1 } : { price: 1 })
        .skip(skip)
        .limit(limit);
    } else {
      products = await Product.find()
        .sort(sort === 'desc' ? { price: -1 } : { price: 1 })
        .skip(skip)
        .limit(limit);
    }

    return res.send({
      status: 'success',
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'error',
      message: 'Error al obtener los productos',
    });
  }
});

module.exports = router;