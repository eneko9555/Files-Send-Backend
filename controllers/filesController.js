import multer from "multer"
import shortid from "shortid"
import fs from "fs"
import Link from "../models/Link.js"

const addFile = async (req, res, next) => {

    const multerConfig = {
        limits: { fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length)
                cb(null, `${shortid.generate()}${extension}`)
            },
        })
    }

    const upload = multer(multerConfig).single('file')

    try {
        upload(req, res, async (error) => {
            if (!req.user && req.file.size >= 1024 * 1024) {
                return res.status(400).json({ msg: "Demasiado grande para tu usuario" })
            }
            if (!error) {
                res.json({ file: req.file.filename })
            } else {
                console.log(error);
                return next()
            }
        })

    } catch (error) {
        console.log(error);
    }
}

const deleteFile = async (req, res) => {

    try {
        fs.unlinkSync(`./uploads/${req.file}`)

    } catch (error) {
        console.log(error);
    }
}

const download = async (req, res) => {
    const fileU = "./uploads/" + req.params.file
    req.file = req.params.file
    const file = await Link.findOne({name : req.params.file})
    if(!file) return
    
    try {
        if(file.downloads > 0 ) {
            res.download(fileU)
            file.downloads--         
            await file.save()
        } else {
            fs.unlinkSync(`./uploads/${req.file}`)
            await file.deleteOne()
           
        }
    } catch (error) {
        console.log(error);
        
    }
}

export { addFile, deleteFile, download }