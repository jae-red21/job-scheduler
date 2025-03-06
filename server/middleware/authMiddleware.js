import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({success: false, message: 'Unauthorized: No token provided'})
        }

        const token = authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({success: false, message: 'Unauthorized: Invalid token format'});
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY)

    if (!decoded) {
        return res.status(401).json({success: false, message: 'Unauthorized: Invalid token'})
    }

    const user = await User.findById({_id: decoded._id}).select('-password');

    if (!user) {
        return res.status(404).json({success: false, message:"User not found"})
    }

     req.user = user
     next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message: "Server Error"})
    }

}

export default verifyUser