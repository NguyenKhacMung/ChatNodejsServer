import { Request, Response } from 'express'
import Messages from '../models/Messages'
import ChatRoom from '../models/ChatRooms'

//get all chat room
const getAllChatRoom = async (req: Request, res: Response) => {
  try {
    const chatRooms = await ChatRoom.find()
      .populate([
        { path: 'users' },
        {
          path: 'messages',
          populate: {
            path: 'user',
            model: 'Users',
          },
        },
      ])
      .sort({ createdAt: -1 })
    res.json(chatRooms)
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//get chat room by user id
const getChatRoomByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const chatRooms = await ChatRoom.find({ users: userId }, { __v: 0 })
      .populate([
        {
          path: 'users',
          select: { _id: 1, username: 1, image: 1 },
        },
        {
          path: 'messages',
          select: { __v: 0 },
          options: {
            sort: { createdAt: -1 },
            limit: 10,
          },
          populate: {
            path: 'user',
            model: 'Users',
            select: { _id: 1, username: 1, image: 1 },
          },
        },
      ])
      .sort({ updatedAt: -1 })
    res.json(chatRooms)
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//post chat room
const postChatRoom = async (req: Request, res: Response) => {
  try {
    const { name, users, messages } = req.body
    const chatRoom = new ChatRoom({
      name,
      users,
      messages,
    })
    const savedChatRoom = await chatRoom.save()
    const chatRooms = await savedChatRoom.populate('users', 'messages')
    res.json(chatRooms)
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//update chat room
const updateChatRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, users, messages } = req.body
    const chatRoom = await ChatRoom.findByIdAndUpdate(id, { name, users, messages }, { new: true })
    res.json(chatRoom)
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

//delete chat room
const deleteChatRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const chatRoom = await ChatRoom.findByIdAndDelete(id)
    const messagesDelete = await Messages.deleteMany({ chatRoom: id })
    res.json(chatRoom)
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

export { getAllChatRoom, getChatRoomByUserId, postChatRoom, updateChatRoom, deleteChatRoom }
