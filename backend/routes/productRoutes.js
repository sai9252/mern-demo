import express from "express";

import { createdItems, getProductItems, updateProductItems, deleteProductItems} from "../controllers/productController.js";


const router = express.Router();

router.post("/products", createdItems);
router.get("/allItems",getProductItems)
router.put("/UpdatedItems/:id",updateProductItems)
router.delete("/deleteItems/:id",deleteProductItems)

export default router;