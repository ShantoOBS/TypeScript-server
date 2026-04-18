import express, {  Request, Response } from "express"
import initDB from "./config/db";
import { config } from "./config";
import { pool }   from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
const app = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded());



initDB();


app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello World!')
})

//USER CRUD

app.use("/users",userRoutes);


//todos CRUD

app.use("/todos",todoRoutes);



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