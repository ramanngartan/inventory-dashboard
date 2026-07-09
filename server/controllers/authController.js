
import User from "../models/User.js";

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

export async function register(req, res) {

    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.role
    ) {
        return res.status(400).json("All fields are required!")
    }

    const existingUser = await User.findOne({
        email : req.body.email
    });

    if (existingUser) {
        return res.status(409).json("User already exists!");
    }

    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = {
            ...req.body,
            password : hashedPassword
        }

        const user = await User.create(userData);

        const userObject = user.toObject();
        delete userObject.password;

        return res.status(201).json(userObject)

    }

    catch (error) {

        console.log(error);

        return res.status(500).json("Internal Server Error")

    }

}


export async function login(req, res) {

    console.log("Request Body:", req.body);

    if (!req.body.email || !req.body.password) {
        return res.status(400).json("All fields are required");
    }

    try {
        
        const existingUser = await User.findOne({
            email : req.body.email
        })

        console.log("User Found:", existingUser);

        if (existingUser === null) return res.status(401).json("Invalid Credentials");

        const isMatch = await bcrypt.compare(
            req.body.password,
            existingUser.password
        )

        console.log("Password Match:", isMatch);

        if (!isMatch) return res.status(401).json("Invalid Credentials");

        const token = jwt.sign(
            {
                userId : existingUser._id
            },
            process.env.JWT_SECRET
        )

        console.log(token);

        res.json(token);

    }

    catch (error) {

        console.log(error);

        res.status(500).json("Internal Error Occured")

    }

}

export async function profile(req, res) {

    const user = await User.findById(
        req.user.userId
    ).select("name email role -_id")

    res.json(user);

}