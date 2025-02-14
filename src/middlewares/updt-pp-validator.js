import {param} from "express-validator";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import {userExists} from "../helpers/db-validator.js";  

export const updateProfilePictureValidator = [
    param("uid").isMongoId().withMessage("No es un id valido de mongo"),
    param("uid").custom(userExists),
    validateFields,
    handleErrors
]