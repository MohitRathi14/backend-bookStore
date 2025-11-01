const Admin = require('./models/Admin');
async function createAdmin() {
    try {
        let adminExists = await Admin.findOne({ email: 'naushad@yopmail.com' });
        if (adminExists) {
            console.log("Admin updated.....");
        } else {
            let admin = new Admin();
            admin.firstName = "Naushad";
            admin.lastName = "Imam";
            admin.email = "naushad@yopmail.com",
                admin.password = "12345";
            await admin.save();
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports = createAdmin;