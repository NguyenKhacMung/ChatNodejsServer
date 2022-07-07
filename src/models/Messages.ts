import { Schema, model, Types } from 'mongoose'
interface Message {
  user: Types.ObjectId
  chatRoom: Types.ObjectId
  message: {
    value: string
    type: string
  }
}

const message: Schema = new Schema<Message>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    chatRoom: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
    message: {
      value: { type: String, required: true },
      type: { type: String, required: true },
    },
  },
  { timestamps: true }
)

export default model<Message>('Messages', message)
