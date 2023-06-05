'use client'

// page for user other than logged in one

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const UserProfile = ({ params }) => {
  const [userPosts, setUserPosts] = useState([])
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')
  // useSearchParams to get the user name and show it in the title..

  useEffect(() => {
    const fetchPosts = async () => {
      // get posts by creator id
      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()

      setUserPosts(data)
    }
    if (params.id) fetchPosts()
  }, [])

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName} personalized profile page`}
      data={userPosts}
    />
  )
}

export default UserProfile
