const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookTitle: { type: String, required: true },
    authorName: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    language: { type: String, default: 'Hindi', enum: ['Hindi', 'English', 'Punjabi'] },
    binding: { type: String, default: 'PaperBinding', enum: ['PaperBinding', 'HardCover', 'Spiral'] },
    publisher: { type: String, required: true },
    isReplaceable: { type: Boolean, default: true, enum: [true, false] },
    quantity: { type: Number, default: 0 },
    originalPrice: { type: Number, default: 0 },
    genre: { type: String, required: true },
    isbn: { type: String, required: true },
    edition: { type: String, required: true },
    isUsed: { type: Boolean, default: false, enum: [true, false] },
    pages: { type: Number, default: 0 },
    publishYear: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    image: { type: String, required: true },
    status: { type: String, default: 'Active', enum: ['Active', 'Disabled'] },
    createdAt: Date,
    updatedAt: Date,
})
bookSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Book', bookSchema);