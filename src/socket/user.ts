import { Socket, Server } from 'socket.io'
import Users from '../models/Users'

const updateUser = (socket: Socket, io: Server) => {
  socket.on('updateUser', async ({ username, userId, image }, callBack) => {
    try {
      const user = await Users.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          username,
          image,
        },
        {
          new: true,
          select: { password: 0, __v: 0 },
        }
      )

      io.emit('updateUser', {
        user,
      })
      callBack({
        status: true,
        user,
      })
    } catch (error) {
      console.log(error)
    }
  })
}

export { updateUser }
