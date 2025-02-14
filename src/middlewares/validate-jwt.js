import jwt from "jsonwebtoken"
import User from "../user/user.model.js"

export const validateJWT = async (req, res, next) => {
    try{
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            return res.status(400).json({
                success: false,
                message: "There is no token in the request"
            })
        }

        token = token.replace(/^Bearer\s+/, "")

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const user = await User.findById(uid)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            }) 
        }

        if(user.status === false){
            return res.status(400).json({
                success: false,
                message: "Previously deactivated user"
            })
        }

        req.usuario = user
        next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message : "Error validating token (expired or invalid)",
            error: err.message
        })
    }
}


export const validatePermission = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if (!token) {
            return res.status(400).json({ 
                success: false, 
                msg: "There is no token in the request" 
            });
        }

        token = token.replace(/^Bearer\s+/, "")

        const { uid: tokenUid, role } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const user = await User.findById(tokenUid);
        if (!user) {
            return res.status(400).json({ 
                success: false, 
                msg: "User not found" 
            });
        }

        if(user.status === false){
            return res.status(400).json({
                success: false,
                message: "Previously deactivated user"
            })
        }

        if (role !== "ADMIN_ROLE" && tokenUid !== req.params.uid) {
            return res.status(403).json({ 
                success: false, 
                msg: "You do not have permission to delete this user" 
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            msg: "Error validating token (expired or invalid)" 
        });
    }
};