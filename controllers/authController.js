import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        //validation

        if(!name || !email || !password || !phone || !address) {
            return res.send({error: "All details must be required"});
        }

        //check if email already exists
        const existingUser = await userModel.findOne({email});
        //existing user
        if(existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Email already exists.',
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address
        }).save();

        res.status(200).send({
            success: true,
            message: 'User registered successfully.',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while registering the user.',
            error
        })
    }
};

// Login the user
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if(!email ||!password) {
            return res.status(400).send({
                success: false,
                message: 'Email and password are required.'
            })
        }
        //check if user exists
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found.'
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match) {
            return res.status(401).send({
                success: false,
                message: 'Invalid password.'
            })
        }
        //generate token
        const token = await JWT.sign({ _id: user._id}, process.env.JWT_SECRET, {expiresIn: "7days"});
        res.send({
            success: true,
            message: 'User logged in successfully.',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while logging in.',
            error
        })
    }
}

// test controller

export const testController = (req, res) => {
    res.send('protected routes');
}