import User from '../src/user/user.model.js'
import Category from '../src/category/category.model.js'
import {hash} from 'argon2'

export const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'ADMIN_ROLE' })

        if (!existingAdmin) {
            const aEmail = 'admin@gmail.com'
            const aPassword = 'admin123'

            const encryptedPassword = await hash(aPassword)

            const aUser = new User({
                name: 'Admin',
                surname: 'Admin',
                username: 'admin1',
                email: aEmail,
                telephone: "11111111",
                password: encryptedPassword,
                role: 'ADMIN_ROLE',
            })

            await aUser.save()
            console.log('The default admin has been created successfully')
        } else {
            console.log('There is already an admin in the system, another one will not be created')
        }
    } catch (err) {
        console.error('Error creating default admin:', err)
    }
}

export const createDefaultCategory = async () => {
    try {
        const name = "default"
        const description = "This is the default category"

        const existingCategory = await Category.findOne({ name })

        if (!existingCategory) {
        const newCategory = new Category({
            name,
            description
        });

        await newCategory.save()
        console.log("The default category has been created successfully")

        }else{
        console.log("A category already exists in the system, another one will not be created")
        }
    } catch (err) {
        console.error("Error creating categories:", err)
    }

}