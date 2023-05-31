import express from "express"
import { addFile, download } from "../controllers/filesController.js"
import auth from "../middlewere/auth.js"

const router = express.Router()

router.post("/", auth, addFile )

router.get("/:file", download)


export default router

