// create new post api

import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const POST = async (req) => {
  // creating a new post, meaning POST method
  const { userId, prompt, tag } = await req.json()
  // what are in the body we need to use? get them here

  try {
    await connectToDB()
    const newPrompt = new Prompt({ creator: userId, prompt, tag })
    // Prompt is the data model
    await newPrompt.save()
    // Save it in the database

    return new Response(JSON.stringify(newPrompt), { status: 201 })
    // give a nice response
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 })
    // give a nice error response
  }
}
