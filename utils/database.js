// Connection to MONGO DB

import mongoose from 'mongoose'

let isConnected = false
//track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)
  // just do these or get warnings!

  if (isConnected) {
    console.log('MongoDB is connected')
    return
    // if connected exit the function
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // try to connect with Mongodb Uri
      dbName: 'share_prompt',
      // our database name to save / use
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    // if trying to connect is success, set connection to true
    isConnected = true
  } catch (error) {
    console.log(error)
  }
}
