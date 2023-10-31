import Product from "../models/Products.js";
import { createError } from "../utils/error.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apiFeatures.js"


export const createProducts = catchAsyncErrors(
    async (req, res, next) => {
        const newProduct = new Product(req.body);

        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (err) {
            next(err);
        }
    }
)

// get
export const getProduct = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            // res.status(500).json({
            //     success: false,
            //     message: "Product not found"
            // })
            return next(createError(404, "Product not found!"))

        }

        try {
            const getProduct = await Product.findById(req.params.id)
            res.status(200).json({ success: true, getProduct })

        } catch (err) {
            next(err)

        }

    }
)



// Get All Product
export const getAllProducts = catchAsyncErrors(



    async (req, res, next) => {

        try {
            const resultPerPage = 5;
            const productsCount = await Product.countDocuments();
            const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
            const products = await apiFeature.query
            res.status(200).json({ success: true, products, productsCount })

        } catch (err) {
            next(err)

        }
    }
)


// update

export const updateProduct = catchAsyncErrors(
    async (req, res, next) => {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(createError(404, "Product not found!"))

        }

        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            })
            res.status(200).json({ success: true, updatedProduct })

        } catch (err) {
            next(err)

        }

    }

)

// delete
export const deleteProduct = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            // res.status(500).json({
            //     success: false,
            //     message: "Product not found"
            // })
            return next(createError(500, "Product not found!"))

        }
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json({
                success: true,
                message: "Product Deleted Successfully",
            })

        } catch (err) {
            next(err)

        }

    }
)