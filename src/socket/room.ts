import { Socket, Server } from 'socket.io'
import Messages from '../models/Messages'
import ChatRoom from '../models/ChatRooms'

const addRoom = (socket: Socket, io: Server) => {
  socket.on('addRoom', async ({ name, users, userAdd, avatar }, callBack) => {
    try {
      const chatRoom = new ChatRoom({
        name,
        users,
        avatar,
      })
      const savedChatRoom = await chatRoom.save()
      const chatRoomAdd = await savedChatRoom.populate([
        {
          path: 'users',
          select: { _id: 1, username: 1 },
        },
        {
          path: 'messages',
          select: { __v: 0 },
          options: {
            limit: 2,
            sort: { createdAt: -1 },
          },
          populate: {
            path: 'user',
            model: 'Users',
            select: { _id: 1, username: 1 },
          },
        },
      ])

      io.emit('addRoom', { chatRoomAdd, userAdd })
      callBack({
        status: true,
        chatRoomAdd,
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const deleteRoom = (socket: Socket, io: Server) => {
  socket.on('deleteRoom', async ({ chatRoomId }, callBack) => {
    try {
      const chatRoomDelete = await ChatRoom.findByIdAndDelete(chatRoomId)
      const messagesDelete = await Messages.deleteMany({ chatRoom: chatRoomId })

      io.emit('deleteRoom', {
        chatRoomDelete,
        messagesDelete,
      })
      callBack({
        status: true,
        chatRoomDelete,
        messagesDelete,
      })
    } catch (error) {
      console.log(error)
    }
  })
}

export { addRoom, deleteRoom }
