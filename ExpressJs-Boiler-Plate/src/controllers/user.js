import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/jwtToken.js";
import { ApiError } from "../utils/ApiErrors.js";


//Auth user & get token
export const getLogin = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select("+password");
    
            if (!email || !password) {
                return next(new ApiError( 400, "Please enter your email / password"));
            }

            if (!user) {
                return next(new ApiError( 400, "User doesn't exists...."));
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return next(new ApiError( 400, "Authentication failed..."));
            }

            sendToken(user, 201, res);
        } catch (error) {
            return next(new ApiError( 500,error.message));
        }
    };

//Register User
export const getSignUp= async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const userEmail = await User.findOne({ email });

            if (userEmail) {
                return next(new ApiError(400, "User already exists..."));
            }

            const user = {
                name: name,
                email: email,
                password: password,
            };

            const activationToken = createActivationToken(user);
            const activationUrl = `https://bytemert-tech-shop.netlify.app/activation/${activationToken}`;

            try {
                await sendMail({
                    email: user.email,
                    subject: "Activate your account",
                    message: `Hello ${user.name}, please click on the link to verify ${activationUrl}`,
                });

                res.status(201).json({
                    success: true,
                    message: `Please check your email:- ${user.email} to activate your account`,
                });
            } catch (error) {
                return next(new ApiError( 500, error.message,));
            }
        } catch (error) {
            return next(new ApiError(400, error.message, ));
        }
    };


// activate user
export const activation =async (req, res, next) => {
        try {
            const { activation_token } = req.body;
            const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

            if (!newUser) {
                return next(new ApiError(400, "Invalid token"));
            }

            const { name, email, password } = newUser;

            let user = await User.findOne({ email });

            if (user) {
                return next(new ApiError( 400, "User already exists"));
            }

            user = await User.create({
                name,
                email,
                password,
            });
            sendToken(user, 201, res);
        } catch (error) {
            return next(new ApiError( 400, error.message,));
        }
    };


//Log out user & distroy the cookies
export const logOut= async (req, res, next) => {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({
            message: "Logged out successfully...",
        });
    };


//Create activation token
const createActivationToken = (user) => {
    const userObject = user.toObject ? user.toObject() : user;
    return jwt.sign(userObject, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};

module.exports = router;
