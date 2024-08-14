import bcrypt from  "bcrypt"

export const hashpassword =  async (password) =>{
  const pass = await bcrypt.hash(password , 10)

  return pass
}

export const compare =  async (password , hashpassword) =>{
    return await  bcrypt.compare(password , hashpassword)

}