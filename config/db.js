import mongoose from "mongoose"


const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const db = await mongoose.connect(process.env.DB_URL);

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectada en ${url}`);

    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB