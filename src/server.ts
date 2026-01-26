import express, { Request, Response } from "express"
import path from 'path'
import {Pool} from 'pg'
import dotenv from 'dotenv'

dotenv.config({path:path.join(process.cwd(),".env")})
const app = express()
const port = 5000

app.use(express.json());


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
    );
  `);
};

initDB();


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})


app.post("/",(req:Request ,res: Response)=>{
    console.log(req.body);

    res.status(201).json({
        success : true,
        message : "API is working",
    })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})