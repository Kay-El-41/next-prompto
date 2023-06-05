import NextAuth from 'next-auth/next'
// to make authorization api
import GoogleProvider from 'next-auth/providers/google'
// to use google sign-in
import { connectToDB } from '@utils/database'
// to connect with DB
import User from '@models/user'

const handler = NextAuth({
  providers: [
    // providers are sign in options we can use in application, in this case we are using google only.
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // get these from google cloud, it's free
      // make a new project > API & Services >> OAuth Screen >> Credentials >> OAuth Client ID
    }),
  ],
  callbacks: {
    // run these functions once authorization success
    async session({ session }) {
      // this checks who logged in?
      const sessionUser = await User.findOne({ email: session.user.email })
      // get the user data from the dB with this email.
      // ဘယ်သူ logged in ဝင်လာတာလဲ။ ဝင်လာတဲ့ user ကို DB ကနေ data လှမ်းတောင်း
      session.user.id = sessionUser._id.toString()
      return session
      // ဒီက ပို့လိုက်တာကို useSession ကနေ ပြန်လှမ်းတောင်း
    },
    async signIn({ profile }) {
      try {
        await connectToDB()
        // connect to mongodb
        const userExists = await User.findOne({
          // User is from model, User is a in-name for a data model
          // check if a user a user with this email already exist?
          email: profile.email,
        })
        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          })
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
// this is according to Next-auth documentation
