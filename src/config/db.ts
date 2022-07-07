const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB Connected...')
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}
// module.exports = connectDB
export default connectDB