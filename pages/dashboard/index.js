import connectDB from "@/configs/db";
import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";
import React from "react";

function Dashboard({userInfo}) {
  console.log(userInfo);
  
  return (
    <>
      <h1>{userInfo.role}-{userInfo.firstname} - {userInfo.lastname} - Welcome To Dashboard</h1>
    </>
  );
}

export default Dashboard;

export async function getServerSideProps(context) {
 const {token}=context.req.cookies;
 connectDB();
 if(!token){
  return{
    redirect:{
      destination:"/signin"
    }
  }
 }
 const tokenPayload=verifyToken(token);
  if(!tokenPayload){
  return{
    redirect:{
      destination:"/signin"
    }
  }
 }
  const userInfo=await userModel.findOne({email:tokenPayload.email},"-password -__v");
  console.log(userInfo);
   
    return{
      props:{
        userInfo:JSON.parse(JSON.stringify(userInfo))
      }
    }
}