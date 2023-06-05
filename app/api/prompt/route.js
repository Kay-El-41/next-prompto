// API for fetching all prompts for feed

import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (request) => {
  try {
    await connectToDB()
    const prompts = await Prompt.find({}).populate('creator')
    // Prompt model ထဲက prompt တွေကိုပေးပါ. Creator ကို id အစား user အပြည့်ထည့်ပေးပါ၊
    // Prompt Schema မှာ creator ကို object types နဲ့သုံးခဲ့လို့တာ populate ပြန်သုံးလို့ရတာဖြစ်တယ်။
    return new Response(JSON.stringify(prompts), { status: 200 })
    // JSON တွေကို object လုပ်ပေးပါ။
  } catch (error) {
    return new Response('Failed to fetch prompts', { status: 500 })
  }
}

