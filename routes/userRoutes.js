import express from "express"
import { register, login, profile } from "../controllers/userControllers.js"
import { check } from "express-validator"
import auth from "../middlewere/auth.js"

const router = express.Router()

// Users

router.post("/register",
    [
        check("name", "El Nombre es obligatorio").not().isEmpty(),
        check("email", "Agrega un Email válido").isEmail(),
        check("password", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 })
    ],
    register)

router.post("/login",
    [
        check("email", "Agrega un Email válido").isEmail(),
    ],
    login)

router.get("/profile", auth, profile)



export default router