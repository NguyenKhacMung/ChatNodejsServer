import { Schema, model, Types } from 'mongoose'
interface ChatRoom {
  name: string
  users: Types.ObjectId[]
  messages: Types.ObjectId[]
  avatar?: string
}

const ChatRoom: Schema = new Schema<ChatRoom>(
  {
    name: { type: String, required: true },
    users: { type: [Types.ObjectId], ref: 'Users' },
    messages: { type: [Types.ObjectId], ref: 'Messages' },
    avatar: { type: String },
  },
  { timestamps: true }
)

export default model<ChatRoom>('ChatRoom', ChatRoom)
