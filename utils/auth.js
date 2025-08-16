import {hash} from "bcryptjs"
import { sign } from "jsonwebtoken";

const hashPassword=async(password)=>{
 const hashedPassword=await hash(password,12);
 return hashedPassword
}

export const generateToken=(data)=>{
const token=sign({...data},process.env.privateKey,{
    // algorithm:"RS256"
    expiresIn:"24h"
})
return token
}
export default hashPassword