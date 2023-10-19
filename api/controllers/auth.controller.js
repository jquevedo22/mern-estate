import User from '../models/user.model.js';
import  bcrypt from 'bcrypt';
import mongoose  from 'mongoose';
import { errorHandler } from '../utils/error.js';
 
export const signup =  (req, res, next) => {
    const { username, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashPassword) => {
        if(err){
           next(err);
        }else{
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: username,
                email: email,
                password: hashPassword
            });
            newUser.save()
            .then(result => {
               res.status(201).json({
                    message: 'User successfully created'
               });
            })
            .catch(error => {
                next(error);
            });
        }
    });

};
