const express = require("express");
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config();



// variables
const port = process.env.PORT
const db = process.env.MONGO_URL

// express app
const app = express();

const corsOptions ={
  origin:'*', 
  credentials:true,       
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

// middleware
app.use(express.json());
app.use((req , res ,next)=>{
  console.log(req.path , req.method)
  next()
})

//routes
app.use( '/api/workouts', workoutRoutes);
app.use( '/api/user', userRoutes);



// connect to db
mongoose.set('strictQuery', false);
mongoose.connect(db)
.then( ()=>{
    // listten for reuest
    app.listen(port , ()=>{
  console.log(`start listening on port ${port}`)
  
})
  })
.catch((err)=>{
  console.log(err)
  console.log("connect connect to db")
  })

app.get('/', (req ,res)=>{
  res.send("hi")
})


