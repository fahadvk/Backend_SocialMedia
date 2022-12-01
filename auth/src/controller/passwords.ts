import bcrypt from "bcrypt";

export const hashPassword = async (data: string) => {
  const saltRounds = 10;
  try {
    const salt = await  bcrypt.genSalt(saltRounds)
    const hash = await  bcrypt.hash(data, salt)
    return hash
  } catch (error) {
     return 
  }
 
     

};
export const comparePass = async(password:string,comparingpass:string)=>{
  try {
   const valid =await bcrypt.compare(comparingpass,password)
   if(valid) return true
   else return false
  } catch (error) {
    
  }
}