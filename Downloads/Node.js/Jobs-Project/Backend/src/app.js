import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./db/database.js"
import companyrouter from "./routes/company.js"
import  Userrouter  from "./routes/user.js"
import  Jobrouter  from "./routes/job.js"
import  Applicatsrouter  from "./routes/application.js"


const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions = {
    origin : "http//localhost:5173" , 
    credentials:true 
}

app.use(cors(corsOptions))
const PORT = process.env.PORT || 3000



//Router

app.use("/api/v1/user",  Userrouter);
app.use("/api/v1/company"  , companyrouter)
app.use("/api/v1/job" , Jobrouter )
app.use("/api/v1/application" , Applicatsrouter )

app.listen(PORT , () =>{
    connectDB()
    console.log(`Server running at port ${PORT}`)
    
})