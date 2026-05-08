const Admin = require('../models/Admin')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
async function doAdminLogin(req, res) {
    try {
        console.log(req.body)
        let user = await Admin.findOne({ email: req.body.email })
        if (!user) {
            res.status(500).send({ success: false, message: 'Invalid User Name/password' });
        } else {
            if (user.password === req.body.password) {
                user.lastLogin = new Date();
                
                await user.save();
                res.status(200).send({ success: true, message: 'Login Success' ,})
            } else {
                res.status(500).send({ success: false, message: 'Invalid User Name/password' });
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: 'Something Went Wrong...' });
    }
}
async function addUser(req, res) {
    try {
        console.log(req.body);
        let user = new User(req.body);
        let encryptredPassword = bcrypt.hashSync(req.body.password, 10);
        console.log(user)
        user.password = encryptredPassword;
        await user.save();
        let sendOtp = Math.floor(1000 + Math.random() * 9000);
        let msg = `Dear ${req.body.firstName}, your account has been created on our plateform. Now you can explore our services.Your user name is your mail id.
         Thanks for joining us.\n\n Your OTP for verification is ${sendOtp}`;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'asmit342sumit@gmail.com',
                pass: 'kjex jifb rmni jczd'
            }
        })
        let mailOptions = {
            from: 'asmit342sumit@gmail.com',
            to: req.body.email,
            subject: 'Regading your Account Creation on Book store',
            text: msg
        }
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send({ success: false })
            } else {
                // let SendOtp = sendOtpEmail(req,res);
                // console.log(SendOtp);
                res.status(200).send({ success: true,data:sendOtp  });
                
            }
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false })
    }

}
async function doUserLogin(req, res) {
    try {
        console.log(req.body)
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(500).send({ success: false, message: 'Invalid User Name/password' });
        } else {
            let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (isPasswordValid) {
                user.lastLogin = new Date();
                let secret_key = 'b2Vfb3ZlcnRoZXJlX29yX3NvbWV0aGluZ19lbHNld2hlcmU';
                let token = jwt.sign({ id: user._id, email: user.email }, secret_key, { expiresIn: '2h' });
                let userData = {
                    firstName: user.firstName,
                    email: user.email,
                    token: token
                }
                await user.save();
                res.status(200).send({ success: true, message: 'Login Success', data: userData })
            } else {
                res.status(500).send({ success: false, message: 'Invalid User Name/password' });
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: 'Something Went Wrong...' });
    }
}
// async function sendOtpEmail(req, res) {

//     try {
//         let sendOtp = Math.floor(1000 + Math.random() * 9000);
//         let msg = `Dear ${req.body.firstName}, your OTP for verification is ${sendOtp}`;
//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'asmit342sumit@gmail.com',
//                 pass: 'kjex jifb rmni jczd'
//             }
//         })
//         let mailOptions = {
//             from: 'asmit342sumit@gmail.com',
//             to: req.body.email,
//             subject: 'Regading OTP Verification',
//             text: msg
//         }
//         transporter.sendMail(mailOptions, (err) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send({ success: false })
//             } else {
//                 res.status(200).send({ success: true,otp:sendOtp  })
//             }
//         })
//         return sendOtp;

//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ success: false })
//     }
// }

async function checkPinCodeIsAvelable(req, res) {
    try {
        const availablePinCodes = ['110001', '110002', '110003', '110004', '110005'];
        const pinCode = req.params.pinCode;
        const isAvailable = availablePinCodes.includes(pinCode);
        if (isAvailable) {
            res.status(200).send({ success: true, data: { pinCode: pinCode, isAvailable: true }, message: 'Delivery is available at this pincode.' });
        } else {
            res.status(200).send({ success: true, data: { pinCode: pinCode, isAvailable: false }, message: 'Delivery is not available at this pincode.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: 'Something Went Wrong...' });
    }
}
async function addToCart(req, res) {
    try {
        const userId = req.user.id;
        const { bookId, quantity } = req.body;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        const existingCartItemIndex = user.cart.findIndex(item => item.bookId.toString() === bookId);
        if (existingCartItemIndex >= 0) {
            user.cart[existingCartItemIndex].quantity += quantity;
        } else {
            user.cart.push({ bookId, quantity });
        }
        await user.save();
        res.status(200).send({ success: true, message: 'Book added to cart successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: 'Something Went Wrong...' });
    }
}
module.exports = {
    doAdminLogin,
    addUser,
    doUserLogin,
    checkPinCodeIsAvelable,
    addToCart
}