import User from "../models/User.js"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"

const register = async (req, res) => {

    // Error messages express validator
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email } = req.body
    const findUser = await User.findOne({ email })

    if (findUser) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ msg: error.message })
    }

    try {
        await User.create(req.body)
        res.status(200).json({ msg: "Cuenta creada correctamente" })
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error("El usuario no existe")
        return res.status(401).json({ msg: error.message })
    }

    if (await user.checkPassword(password)) {
        //JWT
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.SECRET, {
            expiresIn: "8h"
        })

        res.status(200).json( token )

    } else {
        const error = new Error("La contraseña es incorrecta")
        return res.status(401).json({ msg: error.message })
    }
}

const profile = async (req, res) => {
    const {user} = req
    res.json(user)
}

export { register, login, profile }