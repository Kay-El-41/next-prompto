'use client'

import Link from 'next/link'
// React-Router-Dom က Link နဲ့ တူတယ်။
import Image from 'next/image'
// Automatically optimizes the images for you!
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
// Make the authorization super simple with next-auth!

const Nav = () => {
  const { data: session } = useSession()
  // logged in ဝင်လာတဲ့ user ကို လှမ်းတောင်း

  const [providers, setProviders] = useState(null)

  // hide mobile menu at first
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders()
      // use getProviders from next-auth/react
      // this allows us to sign in using Google
      setProviders(response)
    }
    setUpProvider()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={'/'} className="flex gap-2 flex-center">
        <Image
          src={'/assets/images/logo.svg'}
          alt="Promptopia Logo"
          width={30}
          height={30}
          className=" object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          // if user is logged in, show create post and sign out, also the user profile image
          <div className="flex gap-3 md:gap-5">
            <Link href={'/create-prompt'} className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href={'/profile'}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          // if the user is not logged in, show the sign in button, and lead to google sign out
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                // mapping objects, we only have google provider, that only generate a google sign in button
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  // provider.id = google
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />

            {toggleDropDown && (
              // if toggle drop down is enabled, show these, else hide these
              // if something is clicked, hide the menu.
              <div className="dropdown">
                <Link
                  href={'/profile'}
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={'/create-prompt'}
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false)
                    signOut()
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
