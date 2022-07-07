import { createServer } from 'http'
import express, { Application } from 'express'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger/openApi.json'
// import swaggerJsDoc from 'swagger-jsdoc'
import connectDB from './config/db'
import { userRouter, chatRoomRouter, messageRouter, authRouter } from './routers'
import { sendMessage } from './socket/message'
import { addRoom, deleteRoom } from './socket/room'
import { updateUser } from './socket/user'

connectDB()
const PORT = process.env.PORT || 4000
const app: Application = express()
const server = createServer(app)
const io: Server = new Server(server, {
  cors: {
    origin: '*',
  },
})
// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Library API',
//       version: '1.0.0',
//       description: 'A simple Express Library API',
//     },
//     servers: [
//       {
//         url: 'http://localhost:4000',
//       },
//     ],
//   },
//   apis: ['./routes/*.js'],
// }
// const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/chatRoom', chatRoomRouter)
app.use('/api/message', messageRouter)

//socket
io.on('connection', (socket: Socket) => {
  console.log('a user connected')

  sendMessage(socket, io)
  addRoom(socket, io)
  deleteRoom(socket, io)
  updateUser(socket, io)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`)
})
