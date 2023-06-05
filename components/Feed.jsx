'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([])

  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      // get all posts

      console.log(data)

      setPosts(data)
    }
    fetchPosts()
  }, [])

  // filtering function
  const filterPrompts = (searchTerm) => {
    const regex = new RegExp(searchTerm, 'i') // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
      // check if search Term is in the posts,
    )
  }

  const handleChange = (e) => {
    // every time user type, clear the 0.5s
    // meaning the interval are cancelled as long as user is typing
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce, search only once user finish typing
    setSearchTimeout(
      setTimeout(() => {
        // every 0.5s search the prompt with user input
        const searchResult = filterPrompts(e.target.value)
        setSearchResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
    const searchResult = filterPrompts(tag)
    setSearchResults(searchResult)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag, a username"
          value={searchText}
          onChange={handleChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        // promptcardlist is at the top of the file,
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
        // clicking on tag will show prompts with that tag
      )}
    </section>
  )
}

export default Feed
