import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    Stock: {
        type: Number,
        required: true,
        maxLength: 4,
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: true,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },


})

export default mongoose.model("Product", ProductsSchema)
