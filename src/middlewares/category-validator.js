import { body } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { categoryExists } from "../helpers/db-validator.js";
import { handleErrors } from "./handle-errors.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";

export const addCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("name").custom(categoryExists),
    validateFields,
    handleErrors,
]

export const getCategoriesValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE")
]

export const updateCategoryValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    body("name").custom(categoryExists),
    validateFields,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    validateFields,
    handleErrors
]