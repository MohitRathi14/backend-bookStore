const express = require('express');
const router = express.Router();
const DiscountController = require('../controllers/DiscountController')

router.get('/books/for/discount', (req, res) => {
    DiscountController.getBooksForDiscount(req, res)
})
router.post('/add/discount', (req, res) => {
    DiscountController.addDiscount(req, res)
})
router.get('/discounts', (req, res) => {
    DiscountController.getDiscounts(req, res);
})
router.delete('/delete/discount/:id', (req, res) => {
    DiscountController.deleteDiscount(req, res);
})
module.exports = router