import express from 'express';
import {registerController, loginController, testController} from '../controllers/authController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router();


//routing
//REGISTER || method POST
router.post('/register', registerController)

//POST || LOGIN
router.post('/login', loginController);

//test
router.get('/test',requireSignIn, isAdmin, testController)




export default router;