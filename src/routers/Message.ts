import { Router } from 'express'
import { getAllMessages, getMessageByChatRoomId, postMessage } from '../controllers/message'
import authenToken from '../middleware/authenToken'

const router = Router()

router.get('/', authenToken, getAllMessages)

router.get('/:chatRoomId', authenToken, getMessageByChatRoomId)

router.post('/', authenToken, postMessage)

export default router
