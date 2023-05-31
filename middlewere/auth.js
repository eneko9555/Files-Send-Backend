import User from "../models/User.js";
import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
           let token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET);

            req.user = await User.findById(decoded.id).select('-password')

            return next()

        } catch (error) {
            const e = new Error('Token no Válido o no existe')
            return res.status(403).json({ msg: e.message })
        }
    }
    next()
}

export default auth