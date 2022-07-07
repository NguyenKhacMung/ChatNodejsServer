import { Request, Response, NextFunction } from 'express'
import { verify, Secret } from 'jsonwebtoken'
import config from 'dotenv'

export interface AuthRequest extends Request {
  userId?: string
}

const authenToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' })
    }

    const { id } = verify(token, process.env.JWT_SECRET as Secret) as { id: string }
    req.userId = id
    next()
  } catch (error) {
    return res.status(403).send(error)
  }
}
export default authenToken
