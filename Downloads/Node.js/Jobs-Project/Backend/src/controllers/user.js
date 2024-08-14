import { User } from "../models/User.model.js"
import { tokenSing } from "../utils/handleJwt.js"
import { compare, hashpassword } from "../utils/handlePaswords.js"


  export  const registro =  async (req , res ) =>{

     try {
          const {fullname  ,  email  ,  phoneNumber , password , role  } = req.body
          if( !fullname || !email || !phoneNumber || !password || !role  ){
               return res.status(400).json({
                   mgs : "Something is missing" ,
                   success : false
               })
            }
          const user = await User.findOne({email})
            if(user){
              res.status(400).json({
                  mgs : "User already exist with this emaill" ,
                  success : false
              })
            }
          
            const  hashedPassword = await hashpassword(password)
         
      
            await  User.create({ 
               fullname ,  
               email,  
               phoneNumber, 
               password : hashedPassword , 
               role 
          })

            return res.status(201).json({
               message: "Account created successfully.",
               success: true
           });

            
     } catch (error) {
          console.log(error)
     }
    
  }
 
  export const login =  async (req , res ) =>{
     try {
          const { email ,  password , role } = req.body
          if( !email ||  !password || !role  ){
              return res.status(400).json({
                  mgs : "Something is missing" ,
                  success : false
              })
           }
     let  user = await User.findOne({email})
  
        if(!user){
          res.status(400).json({
              mgs : "Incorrect emaill" ,
              success : false
          })
        }

        const hashPassword  =  user.get("password" ); 
        const check = await compare( password ,hashPassword )
  
        if(!check){
  
          res.status(400).json({
              mgs : "Incorrect password" ,
              success : false
          })
        }

        if (role !== user.role) {
          res.status(400).json({
              mgs : "Account does exist with current role" ,
              success : false
          })
        }

        const token = await tokenSing(user)

        user = {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile
      }

      console.log(token)

      return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
          msg : `Welcome back ${user.fullname}` ,
          user , 
          success : true 
        })
  


     } catch (error) {
          console.log(error)
     }
  }

  export const logout =   async (req , res ) =>{
     try {

          return res.status(200).cookie("token", "", { maxAge: 0 }).json({
               message: "Logged out successfully.",
               success: true
           }) 

     } catch (error) {
          console.log(error)
     }
  }

  export const updateProfile   = async (req , res ) =>{
     try {
     const {fullname  ,  email  ,  phoneNumber , bio , skills} = req.body
     
     const file = req.file


     let skillsArray  ;

     if(skills){
        skillsArray =   skills.split(",")
     }
     
        const userId = req.id; // middleware authentication
        console.log(userId)
        let user = await User.findById(userId);

     if(!user) {
          return res.status(400).json({
           mgs : "User not found", 
           success : false 
          })
       }
  
       // updating data
       if(fullname) user.fullname = fullname
       if(email) user.email = email
       if(phoneNumber)  user.phoneNumber = phoneNumber
       if(bio) user.profile.bio = bio
       if(skills) user.profile.skills = skillsArray
  
       await user.save()

       user = {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile
      }
  
      return res.status(200).json({
        message: "Profile update successfully",
        user ,
        success: true
    });



     } catch (error) {
          console.log("error")
     }
  }