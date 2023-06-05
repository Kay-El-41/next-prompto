'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      // use API for fetching user specific posts
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()

      setPosts(data)
    }
    if (session?.user.id) fetchPosts()
    // logged in ထားရင် post တွေယူ
  }, [])

  const handleEdit = (post) => {
    // go to edit page
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure to delete this prompt?')
    // show a confirmation alert
    if (hasConfirmed) {
      try {
        // id is integer, turn into string
        await fetch(`api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        })
        // filter the deleted post from the feed posts
        const filteredPosts = posts.filter((p) => p._id !== post._id)
        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
