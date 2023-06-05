import { Schema, model, models } from 'mongoose'

// we will create a user for mongoDB

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exist!'],
    // content: condition, if not condition
    // there only one email with this account
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique',
    ],
    // username should be like this
  },
  image: {
    type: String,
    // image links will be string
  },
})

const User = models.User || model('User', userSchema)
// every time after connecting to mongoDB, check if there is already a User model,
// only create a new User Model when there is no Models existing

export default User
