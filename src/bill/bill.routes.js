import { Router } from "express"
import { confirmPurchaseValidator, getPurchasesValidator, getBillUserValidator } from "../middlewares/bill-validator.js"
import { confirmPurchase, getPurchases, getBillByUser } from "./bill.controller.js"

const router = Router();

/**
 * @swagger
 * /bill/confirmPurchase:
 *   post:
 *     summary: Confirm a purchase
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nit:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Purchase completed successfully
 *       400:
 *         description: Cart is empty or not found
 *       500:
 *         description: Error completing purchase
 */
router.post("/confirmPurchase", confirmPurchaseValidator, confirmPurchase)

/**
 * @swagger
 * /bill/getPurchases:
 *   get:
 *     summary: Get all purchases of the current user
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of purchases
 *       400:
 *         description: No purchases found
 *       500:
 *         description: Error getting purchases
 */
router.get("/getPurchases", getPurchasesValidator, getPurchases)

/**
 * @swagger
 * /bill/getBillUser/{uid}:
 *   get:
 *     summary: Get bills by user ID
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of bills to return
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         description: Number of bills to skip
 *     responses:
 *       200:
 *         description: List of bills
 *       500:
 *         description: Error fetching bills
 */
router.get("/getBillUser/:uid", getBillUserValidator, getBillByUser)

export default router;
