const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;
const discountSchema = new Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    discountName: { type: String, required: true },
    discountType: { type: String, default: 'fixed', enum: ['fixed', 'percentage'] },
    discountValue: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
    validFrom: { type: Date },
    validTo: { type: Date },
    status: { type: String, default: 'Active', enum: ['Active', 'InActive'] },
    createdAt: Date,
    updatedAt: Date,

})
discountSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Discount', discountSchema);