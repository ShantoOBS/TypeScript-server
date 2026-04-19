import { NextFunction, Request,Response } from "express"
import jwt from 'jsonwebtoken';
import { config } from "../config";

export const auth=()=>{
   
    return async(req:Request,res:Response,next:NextFunction)=>{
             
          const token=req.headers.authorization;

          if(!token)return res.status(500).json({message:"You are not allowed"})

          const decoded =  jwt.verify(token,config.jwtSecret as string);

          console.log(decoded);

          next();
    }
}