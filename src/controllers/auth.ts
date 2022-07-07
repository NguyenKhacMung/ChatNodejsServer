import { Request, Response } from 'express'
import { sign, Secret } from 'jsonwebtoken'
import config from 'dotenv'
import User from '../models/Users'

//login authenticate user
const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' })
    }

    if (password !== user.password) {
      return res.status(400).json({ success: false, message: 'Wrong password' })
    }

    const token = sign(
      {
        id: user._id,
        username,
        password,
      },
      process.env.JWT_SECRET as Secret
      // { expiresIn: '20s' }
    )
    res.json({
      _id: user._id,
      username,
      password,
      token,
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

export { login }
