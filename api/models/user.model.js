import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
=======
    _id: mongoose.Schema.Types.ObjectId,
>>>>>>> cf642f6 (create user model)
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
<<<<<<< HEAD
    password:{
        type: String,
        required: true
    }
=======
    password: {type: String, required: true}
>>>>>>> cf642f6 (create user model)
}, {
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);

export default User;