import connectDB from "@/configs/db";
import userModel from "@/models/User";

const handler=async(req,res)=>{
    if(req.method!="POST"){
        return res.status(405).json({ message: "Method not allowed" });
    }
    try {
        connectDB()
        const {firstname,lastname,username,email,password}=req.body;
        if(!firstname.trim()||!lastname.trim()||!username.trim()||!email.trim()||!password.trim()){
            return res.status(422).json({message:"invalid property"})
        }
        //is user exist 
        //hash password
        //generate token
        //create
        await userModel.create({firstname,lastname,username,email,password,role:"USER"})
        return res.status(201).json({message:"user registerd successfully"})
    } catch (error) {
        return res.status(500).json({message:"unknown Error internal server Error "})
    }
}
export default handler