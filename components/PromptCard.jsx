'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  // handleEdit and handleDelete are only for user profile
  const [copied, setCopied] = useState('')
  // check if copied
  const { data: session } = useSession()
  // get the user data of logged in
  const pathName = usePathname()
  // use pathName to see what page at we are.
  const router = useRouter()

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    // This is how you copy post
    setTimeout(() => setCopied(''), 3000)
    // After 3 sec, set state to default
  }

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push('/profile')
    // if post creator and logged in user is the same, go to profile page, mind the return key!!!
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
    // post.creator._id က dynamic route,
    // ?name က query Search, useQuerySearch နဲ့ပြန်ယူ
  }

  return (
    <div className="prompt_card">
      <div className=" flex justify-between items-start gap-5">
        {/* User Image */}
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          {/* User Detail */}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        {/* Copy Icon */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            // check if the text is already copied and show icon based on that
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
            alt="copy"
          />
        </div>
      </div>
      {/* Tag */}
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {/* Profile Edit and Delete */}
      {/* check if the post creator and the user logged in is same, and also in the profile page. */}
      {/* only by then show the edit and delete buttons */}
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit(post.tag)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
