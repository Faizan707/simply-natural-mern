import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    
    if (!req.file) {
        return res.status(400).json({ 
            message: "Profile image is required" 
        });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ 
            message: "Name, email, password and profile image are required" 
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: "User already exists with this email" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const userData = {
            name,
            email,
            password: hashedPassword,
            image: req.file.buffer
        };

        const newUser = await User.create(userData);

        const token = jwt.sign(
            { id: newUser._id, name, email },
            process.env.JWT_TOKEN,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "User created successfully",
            user: {
                userId: newUser._id,
                name: newUser.name,
                email: newUser.email,
                image: newUser.image.toString('base64')
            },
            token
        });

    } catch (error) {
        console.error('User creation error:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Validation error",
                details: error.errors 
            });
        }

        res.status(500).json({ 
            message: "An error occurred while creating the user",
            error: error.message 
        });
    }
};
export const LoginUser = async(req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    try {
        const user = await User.findOne({ email })

        if(!user) {
            return res.status(401).json({message: "Invalid email or password"})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        
        if(!isPasswordMatch) {
            return res.status(401).json({message: "Invalid email or password"})
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role

            },
            process.env.JWT_TOKEN,
            {expiresIn: '1h'}
        )

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                image:user.image
            },
            token
        })

    } catch (error) {
        console.error('Login error:', error)
        return res.status(500).json({ 
            message: "Server error during login",
            error: error.message 
        })
    }
}