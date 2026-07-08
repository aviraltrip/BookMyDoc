import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-profile',getProfile)

export default userRouter