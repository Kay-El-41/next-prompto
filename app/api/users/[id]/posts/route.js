// API for user specific post using user ID


import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (request, {params}) => {
  try {
    await connectToDB()
    const prompts = await Prompt.find({creator: params.id}).populate('creator')
    // get all posts from that user id
    // Prompt model သုံးထားတာမို့ post တွေပြန်ရ
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch prompts created by user', { status: 500 })
  }
}
