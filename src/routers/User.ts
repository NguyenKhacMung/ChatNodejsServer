import { Router } from 'express'
import { getUserById, getAllUsers, postUser, getUserByToken } from '../controllers/user'
import authenToken from '../middleware/authenToken'

const router = Router()

router.get('/:id', authenToken, getUserById)

router.get('/all/users', authenToken, getAllUsers)

router.get('/', authenToken, getUserByToken)

router.post('/', postUser)

export default router
