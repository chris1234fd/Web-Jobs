import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI , {
            useNewUrlParser: true,
             useUnifiedTopology: true,
             })   
             console.log("Conexion exitosa");
    } catch (error) {
        console.error(error);
    }
}


export default connectDB  