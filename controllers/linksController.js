import Link from "../models/Link.js";
import shortid from "shortid";
import bcrypt from "bcrypt"
import { validationResult } from "express-validator";

const newLink = async (req, res) => {

    // Error messages express validator
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const link = await Link.create(req.body)
    link.url = shortid.generate()

    // if user is logged
    if (req.user) {
        const {password, downloads} = req.body

        if (downloads > 1) {
            link.downloads = downloads
        } else {
            link.downloads = 1
        }
        if (password !== "") {
            const salt = await bcrypt.genSalt(10)
            link.password = await bcrypt.hash(password, salt)
        }

        link.author = req.user.id
    }

    try {
        await link.save()
        res.status(200).json({msg: `${link.url}`})
    } catch (error) {
        console.log(error);
    }
}

const getLink = async (req, res) => {
    const url = req.params.url

    const link = await Link.findOne({url})

    if (!link) {
        return res.status(404).json({msg : "El enlace no existe o ha superado el limite de descargas"})
    }

    res.json({ file : link.name , downloads : link.downloads, password: link.password || null })
  
}

const checkPassword = async (req,res) => {
    const url = req.params.url
    const { passwordClient } = req.body

    const link = await Link.findOne({url})

    if (!link) {
        return res.status(404).json({msg : "El enlace no existe o ha superado el limite de descargas"})
    }

    if(link){
        const check = await bcrypt.compare( passwordClient, link.password)
        if(check){
            res.status(200).json({msg: "Contraseña correcta"})
        } else {
            return res.status(404).json({msg : "Contraseña incorrecta"})
        }
    }
}


export { newLink, getLink, checkPassword }