import { Request, Response } from 'express'
import User from '../models/Users'
import { sign, Secret } from 'jsonwebtoken'

export interface AuthRequest extends Request {
  userId?: string
}
//get user by id
const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findById(id, { __v: 0 })
    res.json(user)
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//get user by token
const getUserByToken = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.userId
    const user = await User.findById(id, { __v: 0 })
    res.json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { __v: 0 })
    res.json(users)
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//post user
const postUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const Iuser: any = await User.findOne({ username })
    if (Iuser) {
      return res.status(400).json({ success: false, message: 'User already exists' })
    }

    const user = new User({
      username,
      password,
    })
    const savedUser = await user.save()
    const token = sign(
      {
        id: savedUser._id,
        username,
        password,
      },
      process.env.JWT_SECRET as Secret
      // { expiresIn: '20s' }
    )
    res.json({
      success: true,
      user: {
        _id: savedUser._id,
        username,
        password,
        token,
      },
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

export { getUserById, getAllUsers, postUser, getUserByToken }
