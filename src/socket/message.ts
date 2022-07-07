import { Socket, Server } from 'socket.io'
import Message from '../models/Messages'
import ChatRoom from '../models/ChatRooms'

const sendMessage = (socket: Socket, io: Server) => {
  socket.on('message', async (msg: any, callBack) => {
    try {
      const { chatRoomId, message, userId } = msg
      const messageNew = new Message({
        user: userId,
        message,
        chatRoom: chatRoomId,
      })
      const savedMessage = await messageNew.save()
      const chatRoom = await ChatRoom.findByIdAndUpdate(
        chatRoomId,
        { $push: { messages: savedMessage.id } },
        { new: true, select: { __v: 0 } }
      ).populate([
        {
          path: 'users',
          select: { _id: 1, username: 1, image: 1 },
        },
        {
          path: 'messages',
          select: { __v: 0 },
          options: {
            limit: 10,
            sort: { createdAt: -1 },
          },
          populate: {
            path: 'user',
            model: 'Users',
            select: { _id: 1, username: 1, image: 1 },
          },
        },
      ])

      const messages = await Message.find({ chatRoom: chatRoomId }, { __v: 0 })
        .limit(10)
        .sort({ createdAt: -1 })
        .populate('user', { _id: 1, username: 1, image: 1 })

      // const chatRooms = await ChatRoom.findById(chatRoomId)
      //   .populate([
      //     { path: 'users' },
      //     {
      //       path: 'messages',
      //       options: {
      //         limit: 1,
      //         sort: { createdAt: -1 },
      //       },
      //       populate: {
      //         path: 'user',
      //         model: 'Users',
      //       },
      //     },
      //   ])
      //   .sort({ updatedAt: 1 })

      io.emit('message', {
        messagesNew: messages.reverse(),
        chatRoom,
        chatRoomId,
      })
      callBack({
        status: true,
        message: 'Message sent',
      })
    } catch (error) {
      console.log(error)
    }
  })
}

export { sendMessage }
