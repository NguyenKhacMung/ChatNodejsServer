import { Request, Response } from 'express'
import Message from '../models/Messages'

//get all message
const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find().populate('user')
    res.json(messages)
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//get message by chatRoomId
const getMessageByChatRoomId = async (req: Request, res: Response) => {
  try {
    const { chatRoomId } = req.params
    const { limit }: any = req.query
    const message = await Message.find({ chatRoom: chatRoomId }, { __v: 0 })
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('user', { _id: 1, username: 1, image: 1 })
    res.json(message.reverse())
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//post message
const postMessage = async (req: Request, res: Response) => {
  try {
    const { user, message, chatRoom } = req.body
    const messages = new Message({
      user,
      message,
      chatRoom,
    })
    const savedMessage = await messages.save()
    const Imessage = await savedMessage.populate('user')
    res.json(Imessage)
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}
export { getAllMessages, postMessage, getMessageByChatRoomId }
