import { Request, Response } from "express";
import { todoService } from "./todo.service";

const createTodo=async(req:Request ,res: Response)=>{
    const {user_id,title}=req.body;
    
    try{

     const result= await todoService.createTodo(user_id,title);
        res.status(200).json({
        success : true,
        message : "Todos Created",
        data : result.rows[0],
    })

    }catch(err:any){
       
        res.status(500).json({
          success : false,
          message : err.message
        })
        
    }

}

const getTodo=async(req:Request , res:Response)=>{
   
  try{

    const result= await todoService.getTodo();
    res.status(200).json({
      success : true,
      message : "todos retrieved successfully",
      data : result.rows,
    })

  }catch(err:any){
     res.status(500).json({
      success : false,
      message : err.message
     })
  }

}


const getSingleTodo=async(req:Request, res:Response)=>{
  
   try{

    const result=await todoService.getSingleTodo(req.params.id as string);

    if(result.rows.length==0){
        res.status(400).json({
      success : false,
      message : "Data not found"
     })
    }
    
    res.status(200).json({
      success : true,
      message : "todos retrieved successfully",
      data : result.rows,
    })

   }catch(err:any){
     res.status(500).json({
      success : false,
      message : err.message
     })
    }

}

const updateTodo=async(req:Request, res:Response)=>{

  const {title}=req.body;
  
   try{

    const result=await todoService.updateTodo(title,req.params.id as string);

    if(result.rows.length==0){
        res.status(400).json({
      success : false,
      message : "Data not found"
     })
    }
    
    res.status(200).json({
      success : true,
      message : "Todos update successfully",
      data : result.rows,
    })

   }catch(err:any){
     res.status(500).json({
      success : false,
      message : err.message
     })
    }

}

const deleteTodo=async(req:Request, res:Response)=>{
  
   try{

    const result=await todoService.deleteTodo(req.params.id as string);

    if(result.rowCount==0){
        res.status(400).json({
      success : false,
      message : "Data not found"
     })
    }
    
    res.status(200).json({
      success : true,
      message : "Todos delete successfully",
      data : result.rows,
    })

   }catch(err:any){
     res.status(500).json({
      success : false,
      message : err.message
     })
    }

}


export const todoController={
      createTodo,
      getTodo,
      getSingleTodo,
      updateTodo,
      deleteTodo
}