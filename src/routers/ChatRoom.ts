import { Router } from 'express'
import authenToken from '../middleware/authenToken'
import {
  deleteChatRoom,
  getAllChatRoom,
  getChatRoomByUserId,
  postChatRoom,
} from '../controllers/chatRoom'

const router = Router()

router.get('/user/:userId', authenToken, getChatRoomByUserId)

router.get('/', authenToken, getAllChatRoom)

router.post('/', authenToken, postChatRoom)

router.delete('/:id', authenToken, deleteChatRoom)

export default router
