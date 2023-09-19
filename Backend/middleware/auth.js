import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

const verifyToken = async(req,res,next)=>{
    try {
        let token = req.headers["authorization"] || req.body.token || req.query.token

        if(!token){
          return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Access Denied" })
        }   
        //  token = token.replace('Bearer ',"")
        token = token.split(" ")[1];
        const decode = jwt.verify(token,process.env.SECRET_KEY)
        const user = await User.findById(decode._id)
       
        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Invalid token" })

        }else{
            await user.populate('role')
            req.user = user
            req.token = token
            next()
        }

    } catch (error) {
        // console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "unAuthorized" })
    }
}

export default verifyToken