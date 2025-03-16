//import React, { useState } from "react";
import axios from "axios";

const handleAuth = async (endpoint, userObj) => {
  try {
      //console.log('user object is ',userObj);
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/${endpoint}`, userObj);
      if(res.status===200){
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        return res.data;
      }else if(res.status===400){
        throw new Error(res.message);
      }else{
        throw new Error('Server Error',res.message);
      }
  } catch (err) {
    console.log(process.env);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/auth/${endpoint}`);
    throw new Error(err.response?.data?.message || "Error"+err);
  }
};


export default handleAuth;
