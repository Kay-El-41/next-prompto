'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
// similar to useNavigate usage.

import Form from '@components/Form'

const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const createPrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        // convert object to json
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          // who post this? the current user post this.
          tag: post.tag,
        }),
      })
      // if creating a post ok, go to home
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      // if creating post failed or succeed, reset the submitting state
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
