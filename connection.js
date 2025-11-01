const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/rdprojectbook2025');
        console.log("Db connected..");
    } catch (err) {
        console.log(err);
    }
}
module.exports = connect