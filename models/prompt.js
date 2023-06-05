import { Schema, model, models } from 'mongoose'

const PromptSchema = new Schema({
  creator: {
    // who is the creator
    type: Schema.Types.ObjectId,
    // the creator, it is the user we saved as User
    ref: 'User',
    // one user, creates prompts
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
  },
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt