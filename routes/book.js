const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const router = express.Router();
const BookController = require('../controllers/BookController')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
const uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 10 * 1024 * 1024 },
});
router.post('/add/book', uploader.single("file"), (req, res) => {
    BookController.addBook(req, res);
})
router.get('/books', (req, res) => {
    BookController.getBooks(req, res)
})
router.delete('/delete/book/:id', (req, res) => {
    BookController.deleteBook(req, res);
})
router.get('/book/:id', (req, res) => {
    BookController.getBook(req, res)
})
router.put('/edit/book/:id', (req, res) => {
    BookController.editBook(req, res)
})
router.get('/books/user/home', (req, res) => {
    BookController.getBooksForUserHomePage(req, res)
})
router.get('/user/book/:id', (req, res) => {
    BookController.getBookForUser(req, res)
})
module.exports = router