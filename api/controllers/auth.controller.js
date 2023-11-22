import User from '../models/user.model.js';
import  bcrypt from 'bcrypt';
import mongoose  from 'mongoose';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
 
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

export const signin = async (req, res, next) => {
    const { email, password} = req.body; 
    try{
        const validUser = await User.findOne({ email});
        if(!validUser) return next(errorHandler(404, 'User not found'));

        const validPassword = bcrypt.compare(password, validUser.password, (err, hash) => {
            if(err)return next(errorHandler(401,'Auth failed'));

            if(hash){
                const token = jwt.sign({
                    email: validUser.email,
                    userId: validUser._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: '1h'
                });
                return res
                .cookie('access_token', token , { httpOnly: true })
                .status(200)
                .json({
                    message: 'Auth successful',
                    token: token,
                    userId: validUser._id
                });
            }
            next(errorHandler(401, 'Auth failed'));
        });

    }catch(error){
        next(error);
    }

}