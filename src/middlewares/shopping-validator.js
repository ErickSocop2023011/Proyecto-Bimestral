import { body,param } from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validateFields } from "./validate-fields.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";
import { productExists } from "../helpers/db-validator.js";

export const addToCartValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    body("idProduct").isMongoId().withMessage("Invalid product id"),
    body("idProduct").custom(productExists),
    body("quantity").isNumeric().withMessage("Quantity must be a number"),
    validateFields,
    handleErrors
]

export const getCartValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    validateFields,
    handleErrors
]

export const deleteProductFromCartValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("idProduct").isMongoId().withMessage("Invalid product id"),
    param("idProduct").custom(productExists),
    validateFields,
    handleErrors
]