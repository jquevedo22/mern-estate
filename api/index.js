import express from 'express';  
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//router
import userRouter from './routes/user.route.js';

mongoose.connect(process.env.MONGO)
.then( () => {
    console.log('Connected to DB')
})
.catch( (err) => {
    console.log(err)
});

const app = express();

app.listen(3000, ()=>{
    console.log('Server  is running on port 3000');
});


app.use('/api/user', userRouter);

