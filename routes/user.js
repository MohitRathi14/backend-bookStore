const express = require('express');
const UserController = require('../controllers/UserConroller')
const router = express.Router();
router.post('/admin/login', (req, res) => {
    UserController.doAdminLogin(req, res);
})
router.post('/add/user', (req, res) => {
    UserController.addUser(req, res)
})
router.post('/user/login', (req, res) => {
    UserController.doUserLogin(req, res)
});
router.get('/check/pincode/:pinCode', (req, res) => {
    UserController.checkPinCodeIsAvelable(req, res)
});
router.post('/user/add/to/cart', (req, res) => {
    UserController.addToCart(req, res)
});
module.exports = router