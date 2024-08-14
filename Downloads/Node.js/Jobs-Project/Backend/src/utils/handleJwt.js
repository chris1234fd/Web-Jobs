import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET  = process.env.JWT_SECRET


 export const tokenSing = async (user) =>{

    try {
        return jwt.sign(  {
            
            _id: user._id, 
            email: user.email
        } ,
        JWT_SECRET , {  expiresIn : "2h" 
        })

    } catch (error) {
        console.log( "token " , error)
    }
}


export const verificarToken =  (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (error) {
        console.log("Error verificando el token:", error);
        return null; 
    }
};