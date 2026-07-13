const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public reads — no auth needed
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected mutations — must be logged in
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.patch('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
