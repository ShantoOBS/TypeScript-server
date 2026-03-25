import express, { NextFunction, Request, Response } from "express"
import path from 'path'
import {Pool} from 'pg'
import dotenv from 'dotenv'

dotenv.config({path:path.join(process.cwd(),".env")})
const app = express()
const port = 5000

app.use(express.json());
app.use(express.urlencoded());




const pool= new Pool({
    connectionString:`${process.env.CONCETION_STR}`
})

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      age INT,
      phone VARCHAR(50),
      address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
       CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
};

initDB();

const logger=(req:Request,res:Response,next:NextFunction)=>{
  console.log("hello i am logger");
  next();
}


app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello World!')
})

//USER CRUD

app.post("/users",async(req:Request ,res: Response)=>{
    const {email,name}=req.body;
    
    try{

     const result= await pool.query(`
           INSERT INTO users(name,email) VALUES($1, $2) RETURNING *`,[name,email]);
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

})

app.get("/users",async(req:Request , res:Response)=>{
   
  try{

    const result= await pool.query(`SELECT * FROM users`);
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

})

app.get("/users/:id",async(req:Request, res:Response)=>{
  
   try{

    const result=await pool.query(`SELECT * FROM users WHERE id=$1`,[req.params.id]);

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

})


app.put("/users/:id",async(req:Request, res:Response)=>{

  const {email,name}=req.body;
  
   try{

    const result=await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,[name,email,req.params.id]);

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

})


app.delete("/users/:id",async(req:Request, res:Response)=>{
  
   try{

    const result=await pool.query(`DELETE FROM users WHERE id=$1`,[req.params.id]);

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

})


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