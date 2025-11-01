const express = require('express');
const PlaceController = require('../controllers/PlaceController')
const router = express.Router();
router.post('/add/place', (req, res) => {
    PlaceController.addPlaceForBookDelivery(req, res);
})
router.get('/places/for/book/delivery', (req, res) => {

    PlaceController.getPlacesForBookDelivery(req, res)
})
router.get('/check/pincode/:pinCodeValue', (req, res) => {
    PlaceController.getValuesForPinCode(req, res)
})

module.exports = router