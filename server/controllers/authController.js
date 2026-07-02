
import User from "../models/User.js";

import bcrypt from 'bcrypt';

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