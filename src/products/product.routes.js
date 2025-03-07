import { Router } from "express";
import { createProductValidator, getProductsValidator , getProductValidator, editProductValidator, getOutOfStockProductsValidator, getBestSellingProductsValidator, updateProductPictureValidator, filterProductsValidator, deleteProductValidator } from "../middlewares/product-validator.js";
import { uploadProductPicture } from "../middlewares/multer-uploads.js";
import { addProduct, getProducts, getProduct, editProduct, getOutOfStockProducts, getBestSellingProducts, updateProductPicture, filterProducts, deleteProduct } from "./product.controller.js";    

const router = Router();

/**
 * @swagger
 * /product/addProduct:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               productPicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created product
 *       500:
 *         description: Error creating product
 */
router.post("/addProduct",uploadProductPicture.single("productPicture"),createProductValidator,addProduct);

/**
 * @swagger
 * /product/getProducts:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of products to return
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         description: Number of products to skip
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Error getting products
 */
router.get("/getProducts", getProductsValidator,getProducts);

/**
 * @swagger
 * /product/getProduct/{pid}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not available
 *       500:
 *         description: Error fetching product
 */
router.get("/getProduct/:pid",getProductValidator, getProduct);

/**
 * @swagger
 * /product/updtProduct/{pid}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated product
 *       500:
 *         description: Product update failed
 */
router.put("/updtProduct/:pid",editProductValidator,editProduct);

/**
 * @swagger
 * /product/updtProductPicture/{pid}:
 *   patch:
 *     summary: Update product picture
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               newProductPicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product picture updated successfully
 *       400:
 *         description: No photo provided
 *       500:
 *         description: Error updating product picture
 */
router.patch("/updtProductPicture/:pid", updateProductPictureValidator, uploadProductPicture.single("newProductPicture"),updateProductPicture);

/**
 * @swagger
 * /product/outOfStock:
 *   get:
 *     summary: Get out of stock products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of products to return
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         description: Number of products to skip
 *     responses:
 *       200:
 *         description: List of out of stock products
 *       500:
 *         description: Error fetching out of stock products
 */
router.get("/outOfStock",getOutOfStockProductsValidator,getOutOfStockProducts);

/**
 * @swagger
 * /product/getBestSelling:
 *   get:
 *     summary: Get best selling products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of products to return
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         description: Number of products to skip
 *     responses:
 *       200:
 *         description: Best selling products retrieved successfully
 *       500:
 *         description: Error fetching best selling products
 */
router.get("/getBestSelling",getBestSellingProductsValidator,getBestSellingProducts);

/**
 * @swagger
 * /product/filter:
 *   get:
 *     summary: Filter products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Product name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category ID
 *       - in: query
 *         name: mostSold
 *         schema:
 *           type: boolean
 *         description: Sort by most sold
 *     responses:
 *       200:
 *         description: Filtered products
 *       500:
 *         description: Error filtering products
 */
router.get("/filter",filterProductsValidator,filterProducts);

/**
 * @swagger
 * /product/deleteProduct/{pid}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product has been deleted
 *       500:
 *         description: Error deleting product
 */
router.delete("/deleteProduct/:pid", deleteProductValidator,deleteProduct);

export default router;