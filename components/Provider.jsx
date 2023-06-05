'use client'
// this is client side, because we're using browser function to log in

import { SessionProvider } from 'next-auth/react'
// this enables to get the logged in user

const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

// children is the pages that will requires the logged in user data.
// session is the user logged in.

// we need to wrap Provider function to the pages we want to use, in this case the Root Layout because we are going to use in all pages.

export default Provider
