import connectDB from "@/configs/db";
import userModel from "@/models/User";
import { verifyToken } from "@/utils/auth";
import React from "react";

function PAdmin({userData}) {
  console.log(userData);
  
  return <h1>Welcome To Admin Panel - {userData.username}</h1>;
}

export default PAdmin;

export async function getServerSideProps(context) {
  connectDB();
  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }
  const tokenPayload = verifyToken(token);
  if (!tokenPayload) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }
  const user = await userModel.findOne({ email: tokenPayload.email });
  if (user.role != "ADMIN") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {
      userData:JSON.parse(JSON.stringify(user))
    },
  };
}
