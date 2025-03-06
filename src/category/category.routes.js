import { addCategoryValidator, updateCategoryValidator, getCategoriesValidator, deleteCategoryValidator} from "../middlewares/category-validator.js";
import { addCategory, updateCategory,deleteCategory, getCategories } from "./category.controller.js";
import { Router } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = Router();

/**
 * @swagger
 * /category/addcategory:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
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
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Category creation failed
 */
router.post("/addcategory", addCategoryValidator, addCategory);

/**
 * @swagger
 * /category/getCategories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of categories to return
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         description: Number of categories to skip
 *     responses:
 *       200:
 *         description: List of categories
 *       500:
 *         description: Error getting categories
 */
router.get("/getCategories", getCategoriesValidator, getCategories);

/**
 * @swagger
 * /category/updtcategory/{cid}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
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
 *     responses:
 *       200:
 *         description: Updated category
 *       500:
 *         description: Error updating category
 */
router.put("/updtcategory/:cid", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /category/deletecategory/{cid}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Deleted category
 *       500:
 *         description: Error deleting category
 */
router.delete("/deletecategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;