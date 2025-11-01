const Book = require('../models/Book');
const cloudinary = require("cloudinary").v2;
const mongoose = require('mongoose');
async function addBook(req, res) {
    try {
        let upload;
        if (req.file) {
            cloudinary.config({
                cloud_name: "dtnj3vjad",
                api_key: "836243925894637",
                api_secret: "z0rnS46iWj8QmEKtGeux95BLEpo",
            })
            upload = await cloudinary.uploader.upload(req.file.path);
        }
        let book = new Book(req.body);
        if (req.file && upload) {
            book.image = upload.secure_url;
        }
        await book.save();
        console.log("data saved sucessfully...");
        res.status(200).send({ success: true, message: 'Data saved sucessfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: 'Something Went Wrong...' });
    }
}
async function getBooks(req, res) {
    try {
        console.log(req.query, 'req.query..')
        let skip = (req.query.pageNo - 1) * req.query.limit;
        let limit = req.query.limit;
        let books = await Book.find({ bookTitle: { $regex: new RegExp(req.query.bookTitle, "i") } }).skip(skip).limit(limit);
        let totalBooks = await Book.countDocuments({});
        res.status(200).send({ success: true, data: books, totalCount: totalBooks });

    } catch (err) {
        res.status(500).send({ success: false, message: 'Something Went wrong' });
    }
}
async function deleteBook(req, res) {
    try {
        let bookId = req.params.id;
        await Book.deleteOne({ _id: bookId });

        res.status(200).send({ success: true, message: 'Book Deleted..' })
    } catch (err) {
        res.status(500).send({ success: false, message: 'something went wrong..' })
    }
}
async function getBook(req, res) {
    try {
        let bookId = req.params.id;
        let book = await Book.findOne({ _id: bookId });
        res.status(200).send({ success: true, data: book });
    } catch (err) {
        res.status(500).send({ success: false, message: 'something went wrong' });
    }
}
async function editBook(req, res) {
    try {
        let bookId = req.params.id;
        console.log(bookId, 'book Id')
        console.log(req.body);
        let book = await Book.findOne({ _id: bookId })
        Object.assign(book, req.body);
        await book.save();
        console.log("Book has been updated sucessfully....");
        res.status(200).send({ success: true, message: 'Book has been updated' })
    } catch (err) {
        res.status(500).send({ success: false, message: 'Something went wrong...' })
    }
}
async function getBooksForUserHomePage(req, res) {
    try {
        console.log(req.query);
        //let books = await Book.find({}, { bookTitle: 1, image: 1, shortDescription: 1, authorName: 1, binding: 1, originalPrice: 1 }).limit(req.query.limit);
        //console.log(books, 'books')
        let books = await Book.aggregate([
            {
                $lookup: {
                    from: 'discounts',
                    localField: '_id',
                    foreignField: 'book',
                    as: 'DiscountDetail'
                }
            }
        ])

        res.status(200).send({ success: true, data: books });
    } catch (err) {
        res.status(500).send({ success: false });
    }
}
async function getBookForUser(req, res) {
    try {
        let id = req.params.id;
        let book1 = await Book.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'discounts',
                    localField: '_id',
                    foreignField: 'book',
                    as: 'DiscountDetail'
                }
            }
        ])
        let book = book1[0];
        console.log(book, 'book')

        res.status(200).send({ success: true, data: book });
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false });
    }

}
module.exports = {
    addBook,
    getBooks,
    deleteBook,
    getBook,
    editBook,
    getBooksForUserHomePage,
    getBookForUser
}