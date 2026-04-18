import express, {  Request, Response } from "express"
import initDB from "./config/db";
import { config } from "./config";
import { pool }   from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded());



initDB();


app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello World!')
})

//USER CRUD

app.use("/users",userRoutes)


//todos CRUD

app.post("/todos",async(req:Request ,res: Response)=>{
    const {user_id,title}=req.body;
    
    try{

     const result= await pool.query(`
           INSERT INTO todos(user_id,title) VALUES($1, $2) RETURNING *`,[user_id,title]);
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

})

app.get("/todos",async(req:Request , res:Response)=>{
   
  try{

    const result= await pool.query(`SELECT * FROM todos`);
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

})

app.get("/todos/:id",async(req:Request, res:Response)=>{
  
   try{

    const result=await pool.query(`SELECT * FROM todos WHERE id=$1`,[req.params.id]);

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

})

app.put("/todos/:id",async(req:Request, res:Response)=>{

  const {title}=req.body;
  
   try{

    const result=await pool.query(`UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`,[title,req.params.id]);

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

})

app.delete("/todos/:id",async(req:Request, res:Response)=>{
  
   try{

    const result=await pool.query(`DELETE FROM todos WHERE id=$1`,[req.params.id]);

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

})


app.use((req,res)=>{
    res.status(404).json({
       success:false,
       message: "Routes not found",
       path: req.path,
    })
})







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})