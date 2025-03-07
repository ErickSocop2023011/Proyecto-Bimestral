import { handleErrors } from "./handle-errors.js";
import { validateFields } from "./validate-fields.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";
import {body, param } from "express-validator";
import { userExists } from "../helpers/db-validator.js";


export const confirmPurchaseValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    validateFields,
    handleErrors
]

export const getPurchasesValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    validateFields,
    handleErrors
]

export const getBillUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").notEmpty().isMongoId().withMessage("Invalid user id").custom(userExists),
    validateFields,
    handleErrors
]