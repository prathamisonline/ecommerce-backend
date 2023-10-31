import express from "express"
const router = express.Router();
import { createProducts, getAllProducts, updateProduct, deleteProduct, getProduct } from "../controllers/product.js";
// import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

// create

router.post("/", createProducts)


// update
router.put("/:id", updateProduct)
// get
router.get("/:id", getProduct)
// delete
router.delete("/:id", deleteProduct)

// get all hotel
router.get("/", getAllProducts)

// router.get("/countByCity,countByCities")
// router.get("/countByType,getHotels")



export default router;