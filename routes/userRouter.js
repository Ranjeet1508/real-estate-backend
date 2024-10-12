const express = require('express');
const { UserModel } = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRoute = express.Router();

userRoute.post('/signup', async (req, res) => {
    try {
        const { name, address, mobile, email, password } = req.body;
        let user = await UserModel.findOne({"email": email });
        if (user) {
            return res.status(409).json({
                message: "user already exist"
            })
        }
        bcrypt.hash(password, 4, async function (err, hash) {
            if (err) {
                return res.status(400).json({
                    error: err,
                    message: 'something went wrong'
                })
            }
            let new_user = new UserModel({
                name,
                address,
                mobile,
                email,
                password: hash
            })
            await new_user.save();
        })
        return res.status(200).json({
            success: true,
            message: 'Signup Successfull'
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Internal server error"
        })
    }
})


userRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUser = await UserModel.findOne({ email });
        if (!isUser) {
            res.status(400).json({
                message: "user doesn't exist please login first"
            })
        }
        const hashed_password = isUser.password;
        bcrypt.compare(password, hashed_password, async function (err, result) {
            if (err) {
                return res.status(400).json({
                    message: "something went wrong",
                    error: err.message
                })
            }
            if (!result) {
                return res.status(401).json({
                    message: "Wrong Credentials"
                })
            }
            else {
                let token = jwt.sign({ userId: isUser._id }, process.env.SECRET_KEY);
                return res.status(200).json({
                    message: "login successfull",
                    token,
                    isUser
                })
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }

});

module.exports = {
    userRoute
}