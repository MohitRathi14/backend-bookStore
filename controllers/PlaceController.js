const ProductDeliveryPlace = require('../models/ProductDeliveryPlace');

async function addPlaceForBookDelivery(req, res) {
    try {
        console.log(req.body);
        let productDeliveryPlace = new ProductDeliveryPlace(req.body);
        await productDeliveryPlace.save();
        res.status(200).send({ success: true, message: 'data saved...' });
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: 'someting went wrong..' });
    }

}
async function getPlacesForBookDelivery(req, res) {
    try {
        let places = await ProductDeliveryPlace.find({}).populate('book', { bookTitle: 1 });
        console.log(places, 'places')
        res.status(200).send({ success: true, data: places });
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: 'something went wrong' });
    }

}
async function getValuesForPinCode(req, res) {
    try {
        let pinCode = req.params.pinCodeValue;
        let result = await ProductDeliveryPlace.findOne({ pinCode: pinCode }, { 'isAvailable': 1, 'deliveryTime': 1, 'city': 1 });
        console.log(result);
        if (result) {
            res.status(200).send({ success: true, data: result });
        } else {
            let result1 = {}
            result1.isAvailable = false
            res.status(200).send({ success: true, data: result1 });
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false });
    }

}
module.exports = {
    addPlaceForBookDelivery,
    getPlacesForBookDelivery,
    getValuesForPinCode
}