import {Request,Response} from "express"
import {userServices} from './user.service'

const createUser= async(req:Request ,res: Response)=>{
    const {email,name,password}=req.body;
    
    try{

     const result=await userServices.createUser(name,email,password);
        res.status(200).json({
        success : true,
        message : "Data is inserted",
        data : result.rows[0],
    })

    }catch(err:any){
       
        res.status(500).json({
          success : false,
          message : err.message
        })
        
    }

}

const getAllUser=async(req:Request , res:Response)=>{
   
  try{

    const result=await userServices.getAllUser();
    res.status(200).json({
      success : true,
      message : "User retrieved successfully",
      data : result.rows,
    })

  }catch(err:any){
     res.status(500).json({
      success : false,
      message : err.message
     })
  }

}

const getSingleUser=async(req:Request, res:Response)=>{
  
   try{

    const result=await userServices.getSingleUser(req.params.id as string);

    if(result.rows.length==0){
        res.status(400).json({
      success : false,
      message : "Data not found"
     })
    }
    
    res.status(200).json({
      success : true,
      message : "User retrieved successfully",
      data : result.rows,
    })

   }catch(err:any){
     res.status(500).json({
      success : false,
      message : err.message
     })
    }

}

const updateUser=async(req:Request, res:Response)=>{

  const {email,name}=req.body;
  
   try{

    const result=await userServices.updateUser(name,email,req.params.id as string);

    if(result.rows.length==0){
        res.status(400).json({
      success : false,
      message : "Data not found"
     })
    }
    
    res.status(200).json({
      success : true,
      message : "User update successfully",
      data : result.rows,
    })

   }catch(err:any){
     res.status(500).json({
      success : false,
      message : err.message
     })
    }

}

const deleteUser=async(req:Request, res:Response)=>{
  
   try{

    const result=await userServices.deleteUser(req.params.id as string);

    if(result.rowCount==0){
        res.status(400).json({
      success : false,
      message : "Data not found"
     })
    }
    
    res.status(200).json({
      success : true,
      message : "User delete successfully",
      data : result.rows,
    })

   }catch(err:any){
     res.status(500).json({
      success : false,
      message : err.message
     })
    }

}

export const userContorllers = {
     createUser,
     getAllUser,
     getSingleUser,
     updateUser,
     deleteUser
} 