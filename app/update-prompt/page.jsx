'use client'

// edit-prompt page is not dynamic, instead we use useSearchParams to turn it into alternate dynamic,
// instead of generating dynamic page for prompts, we used searchQuery to get the id of the post, and edit it

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'
import { data } from 'autoprefixer'

const EditPrompt = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  useEffect(() => {
    // get the original post first and set it in the text boxes with state
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    if (promptId) getPromptDetails()
  }, [promptId])

  // when form submitted, update the form
  const updatePrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // no prompt Id, give the alert!
    // HAHA you dumb user, dare you think you could trick me with random url?? WKWKK!!
    if (!promptId) return alert('Prompt ID not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })
      // if update success, go to home
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt
