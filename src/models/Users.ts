import { Schema, model } from 'mongoose'

interface User {
  username: string
  password: string
  image?: string
}

const User: Schema = new Schema<User>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
)

export default model<User>('Users', User)
