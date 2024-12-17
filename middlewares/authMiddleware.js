import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//proctected routes token base

export const requireSignIn = async (req, res, next) => {
    let token;
    token = req.headers.authorization;
       
    //check token
    if (!token) {
        return res.status(401).json({ error: 'You are not authorized to access this route' });
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token is not valid' });
    }
};


//admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'You are Not a Administrator'
            })
        } else {
            next();
        }   
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'Admin........ access denied' });
    }
}