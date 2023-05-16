const express = require('express');
const router = express.Router();
const Product = require('../dao/models/product');
const Cart = require('../dao/models/cart');

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || '';
    const query = req.query.query || '';
    const category = req.query.category || '';
    const availability = req.query.availability || '';

    const skip = (page - 1) * limit;
    let filter = {};

    if (query) {
      filter.title = { $regex: query, $options: 'i' };
    }

    if (category) {
      filter.category = category;
    }

    if (availability) {
      filter.availability = availability;
    }

    const count = await Product.countDocuments(filter);
    const totalPages = Math.ceil(count / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevLink = hasPrevPage ? `/products?page=${prevPage}&limit=${limit}` : null;
    const nextLink = hasNextPage ? `/products?page=${nextPage}&limit=${limit}` : null;

    let products;

    if (sort === 'desc') {
      products = await Product.find(filter)
        .sort({ price: -1 })
        .skip(skip)
        .limit(limit);
    } else {
      products = await Product.find(filter)
        .sort({ price: 1 })
        .skip(skip)
        .limit(limit);
    }

    return res.send({
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'error',
      message: 'Error al obtener los productos',
    });
  }
});

router.get('/products', async (req, res) => {

});


router.get('/products/:id', async (req, res) => {

});


router.post('/products', async (req, res) => {

});


router.put('/products/:id', async (req, res) => {

});


router.delete('/products/:id', async (req, res) => {

});


router.get('/carts', async (req, res) => {

});

router.get('/carts/:id', async (req, res) => {

});

router.post('/carts', async (req, res) => {

});

router.delete('/:cid/products/:pid', async (req, res) => {

});


router.put('/:cid', async (req, res) => {

});

router.put('/:cid/products/:pid', async (req, res) => {

});

router.delete('/:cid', async (req, res) => {
});

module.exports = router;