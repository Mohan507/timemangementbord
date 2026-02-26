import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { mockUsers } from "@/app/lib/mockUsers" // adjust path if needed

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null

        // Find the user in your mock database
        const user = mockUsers.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password
        )

        if (!user) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
})

// App Router requires GET and POST exports
export { handler as GET, handler as POST }