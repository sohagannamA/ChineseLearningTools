const User = require("../Models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();




const generateToken = (id) => {
    const Isgenerate = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
    return Isgenerate;
}

const registration = async (req, res) => {
    const { fullname, email, password } = req.body;
    console.log(fullname);
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: email + " already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = User({
            fullname,
            email,
            password: hashedPassword
        });
        await user.save();
        if (user) {
            return res.status(201).json({
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                token: generateToken(user._id)
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password)
    try {
        const user = await User.findOne({ email });
        if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result === true) {
                console.log("login")
                return res.status(200).json({
                    _id:user._id,
                    fullname:user.fullname,
                    email:user.email,
                    token:generateToken(user._id)
                });
            }
            else {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }
        }
        else {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = { registration,login };

