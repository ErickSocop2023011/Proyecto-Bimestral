import User from "../user/user.model.js";
import Category from "../category/category.model.js"
import Product from "../products/product.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const telephoneExists = async (telephone = "") => {
    const existe = await User.findOne({ telephone })
    if (existe) {
        throw new Error(`User: ${telephone}, is already registered`)
    }
}

export const categoryExists = async (name = "") => {
    const existe = await Category.findOne({ name })
    if (existe) {
        throw new Error(`Category: ${name}, is already registered`)
    }
}

export const productExists = async (pid = " ") => {
    const product = await Product.findById(pid)
    if(!product){
        throw new Error("The product with the provided ID does not exist")
    }
}