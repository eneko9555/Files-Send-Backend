import express from "express"
import { newLink, getLink, checkPassword } from "../controllers/linksController.js"
import {  download } from "../controllers/filesController.js"
import { check } from "express-validator"
import auth from "../middlewere/auth.js"

const router = express.Router()

router.post("/", 
    [
        check("name", "Sube un archivo").not().isEmpty(),
        check("original_name", "Sube un archivo").not().isEmpty()
    ],
    auth, newLink )

router.get("/:url", getLink, download)
router.post("/:url", auth, checkPassword)


export default router

