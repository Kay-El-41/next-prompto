// API for prompt operations using prompt ID

import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

// READ
// READ the prompt data to show in the edit page
export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    // find prompt by id.
    const prompt = await Prompt.findById(params.id).populate('creator')
    if (!prompt) return Response('Prompt Not Found', { status: 404 })
    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 })
  }
}

// PATCH
// Update the prompt
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json()

  try {
    await connectToDB()
    // find the original prompt
    const existingPrompt = await Prompt.findById(params.id)
    if (!existingPrompt)
      return new Response('Prompt Not Found', { status: 400 })
    // edit the prompt
    existingPrompt.prompt = prompt
    existingPrompt.tag = tag
    // save the prompt
    await existingPrompt.save()
    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    return new Response('Failed to update prompt', { status: 500 })
  }
}

// DELETE
//  Delete the prompt
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()
    // find prompt by id and delete it
    await Prompt.findByIdAndRemove(params.id)
    return new Response('Prompt deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Failed to delete prompt', { status: 500 })
  }
}
