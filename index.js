const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./connection');
let createAdmin = require('./createAdmin');
const book = require('./routes/book');
const discount = require('./routes/discount')
const user = require('./routes/user')
const place = require('./routes/place')
app.use(cors());
app.use(book);
app.use(discount);
app.use(user)
app.use(place)
connect();
createAdmin();
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is running on 3000");
    }
})