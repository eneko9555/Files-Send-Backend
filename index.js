import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import usersRoutes from "./routes/userRoutes.js"
import linksRoutes from "./routes/linksRoutes.js"
import filesRoutes from "./routes/filesRoutes.js"
import cors from "cors"


const app = express()
dotenv.config()
connectDB()
app.use(express.json())

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.static('uploads'))

//Routes
app.use("/api/users", usersRoutes)
app.use("/api/links", linksRoutes)
app.use("/api/files", filesRoutes)

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
})