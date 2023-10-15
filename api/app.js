import express from 'express';  
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan  from 'morgan';

//router
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';



dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO)
.then( () => {
    console.log('DB Connected');
})
.catch( (err) => {
    console.log(err)
});
mongoose.Promise = global.Promise;

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 400;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});


export default app;