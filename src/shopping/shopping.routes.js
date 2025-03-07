import { Router } from "express";
import { addToCart, getCart, deleteProductFromCart } from "./shopping.controller.js";
import { addToCartValidator, getCartValidator, deleteProductFromCartValidator } from "../middlewares/shopping-validator.js";

const router = Router();

/**
 * @swagger
 * /shopping/get:
 *   get:
 *     summary: Get the shopping cart
 *     tags: [Shopping]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shopping cart retrieved successfully
 *       400:
 *         description: Cart not found
 *       500:
 *         description: Error getting cart
 */
router.get("/get", getCartValidator, getCart)

/**
 * @swagger
 * /shopping/addToCart:
 *   post:
 *     summary: Add a product to the shopping cart
 *     tags: [Shopping]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idProduct:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *       400:
 *         description: Product not available or out of stock
 *       500:
 *         description: Error adding product to cart
 */
router.post("/addToCart", addToCartValidator, addToCart);

/**
 * @swagger
 * /shopping/deleteProduct/{idProduct}:
 *   delete:
 *     summary: Delete a product from the shopping cart
 *     tags: [Shopping]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted from cart successfully
 *       400:
 *         description: Cart not found or product not in cart
 *       500:
 *         description: Error deleting product from cart
 */
router.delete("/deleteProduct/:idProduct", deleteProductFromCartValidator, deleteProductFromCart);

export default router;