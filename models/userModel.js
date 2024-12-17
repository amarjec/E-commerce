import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    phone : {
        type: String,
        required: true,
        trim: true,
        match: /^\+?\d{1,15}$/
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0,
    }

},{timestamps: true})

export default mongoose.model('users', userSchema);