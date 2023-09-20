import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "@/lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import dbConnect from "@/lib/mongoose"
import User from "@/model/user"
import bcrypt from "bcrypt"


// assume inside db you have these admins 
const validAdminEmails = [
  "alpha@gmail.com", "abhishek.rana.7174@gmail.com"
]

export const authOptions = {
  // Configure one or more authentication providers
  
  adapter: MongoDBAdapter(clientPromise, { databaseName: "ecommerce" }),
  strategy: "database",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("signin callback", {user, account, profile, email, credentials})
      // let isAllowedToSignIn = false
      // if(user) {
      //   validAdminEmails.includes(user.email) && (isAllowedToSignIn = true)
      // }

      // if (isAllowedToSignIn) {
      //   return true
      // } else {
      //   // Return false to display a default error message
      //   return false
      //   // Or you can return a URL to redirect to:
      //   // return '/unauthorized'
      // }
      return true
    },
    async jwt({ user, token, account, isNewUser, trigger }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
      }
      return token;
    },
    async session({session}) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken
      // session.user.id = token.id

      return session
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await dbConnect();

        const { email, password } = credentials;

        if (!email || !password) {
          return false
        }

        const user = await User.findOne({
          email
        })


        // edge if use exist and hashedPassword doesnot then it is user via oauth
        if (!user || !user.hashedPassword) {
          throw new Error("user doesnot exist");
        }


        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

        if (!passwordMatch) {
          throw new Error("password donot match")
        }



        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()

        // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user
        // }
        // Return null if user data could not be retrieved
      
        return user;
      }
    })

    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin',
    // we can customized the rest of the pages as well i will skip 
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
}

export default NextAuth(authOptions)

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log("imp", session?.user?.email);

  if(session?.user?.email && validAdminEmails.includes(session.user.email)) {
    return session
  } else {
    throw new Error("no session or not a admin")
  }
}