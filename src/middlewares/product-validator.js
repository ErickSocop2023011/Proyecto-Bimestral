"use strict"
import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { categoryExists } from "../helpers/db-validator.js";
import { productExists } from "../helpers/db-validator.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("stock").notEmpty().withMessage("Stock is required"),
    body("category").notEmpty().isMongoId().withMessage("Invalid category ID"),
    body("category").custom(categoryExists),
    validateFields,
    deleteFileOnError,
    handleErrors
]

export const getProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    validateFields,
    handleErrors
]

export const getProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("pid").notEmpty().isMongoId().withMessage("Invalid product ID"),
    param("pid").custom(productExists),
    validateFields,
    handleErrors
]

export const editProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("category").optional().isMongoId().withMessage("Invalid category ID").custom(categoryExists),
    validateFields,
    handleErrors
]

export const updateProductPictureValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("pid").notEmpty().isMongoId().withMessage("Invalid product ID"),
    param("pid").custom(productExists),
    validateFields,
    deleteFileOnError,
    handleErrors

]

export const getOutOfStockProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateFields,
    handleErrors
]

export const getBestSellingProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateFields,
    handleErrors
]

export const filterProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    body("category").optional().isMongoId().withMessage("Invalid category ID").custom(categoryExists),
    validateFields,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("category").optional().isMongoId().withMessage("Invalid category ID").custom(categoryExists),
    validateFields,
    handleErrors
]