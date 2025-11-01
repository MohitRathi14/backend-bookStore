const Book = require('../models/Book')
const Discount = require('../models/Discount')
async function getBooksForDiscount(req, res) {
    try {
        let books = await Book.find({ bookTitle: { $regex: new RegExp(req.query.bookTitle, "i") } }, { _id: 1, bookTitle: 1 })
        let sendBooks = [];
        for (let i = 0; i < books.length; i++) {
            sendBooks.push({
                value: books[i]._id,
                label: books[i].bookTitle
            })
        }
        res.status(200).send({ success: true, data: sendBooks })
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: 'Something went wrong..' });
    }
}
async function addDiscount(req, res) {
    try {
        console.log(req.body, 'req.body')
        let discountExists = await Discount.find({ discountName: req.body.discountName })
        console.log(discountExists, 'discount')
        if (discountExists.length) {
            console.log("exists")
            res.status(500).send({ success: false, message: 'Discount Name Already Exists, Please Select another One ..' })
        } else {
            console.log(" Notexists")
            console.log(req.body.book, 'book')
            let book = await Book.findOne({ _id: req.body.book });
            let discount = new Discount(req.body);
            if (req.body.dicountType == 'fixed') {
                discount.finalPrice = book.originalPrice - req.body.discountValue;
            } else {
                discount.finalPrice = book.originalPrice - (book.originalPrice) * (req.body.discountValue) / 100;
            }

            await discount.save();
            res.status(200).send({ success: true, message: 'data saved...' });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: 'someting went wrong..' })
    }
}
async function getDiscounts(req, res) {
    try {
        let discounts = await Discount.find({}).populate('book', { bookTitle: 1, authorName: 1, originalPrice: 1 });

        res.status(200).send({ success: true, data: discounts })
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: 'Something went wrong' })
    }
}
async function deleteDiscount(req, res) {
    try {
        let discoutId = req.params.id;
        console.log(discoutId);
        await Discount.deleteOne({ _id: discoutId });
        res.status(200).send({ success: true, message: 'Deleted Successfully...' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: 'some problem...' });
    }
}
module.exports = {
    getBooksForDiscount,
    addDiscount,
    getDiscounts,
    deleteDiscount
}