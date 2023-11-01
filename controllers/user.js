import { createError } from "../utils/error.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/UserModel.js"

export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: { public_id: "This is a sample id", url: "ProfilePicUrl" },
    })

    const token = user.getJWTToken()

    res.status(201).json({
        success: true,
        token
    })
})