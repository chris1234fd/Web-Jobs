import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const isAuthenticated = (req, res, next) => {
    try {
        // Asegúrate de que el token provenga de las cookies
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                msg: "User not authenticated",
                success: false
            });
        }

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded)

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        // Establecer la ID del usuario en la solicitud
         req.id = decoded._id; // Asegúrate de que el campo _id sea correcto

        // Continuar con la siguiente función de middleware
        next();
    } catch (error) {
        console.error("Error autenticando al usuario:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export default isAuthenticated;
