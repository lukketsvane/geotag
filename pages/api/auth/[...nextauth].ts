// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });

        if (user && await bcrypt.compare(credentials?.password || '', user.password)) {
          // Return a safe subset of the user object that can be exposed to the client
          return { id: user.id, name: user.username, email: user.email };
        } else {
          throw new Error("Invalid username or password");
        }
      },
    }),
  ],
  session: {
    // Use JWT for session management
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // Add user information to the JWT token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Attach the user information to the session
      if (token) {
        session.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',  // Custom sign-in page path
    error: '/login',  // Redirect here on sign-in failure
    // You can specify other custom pages as well
  },
  secret: process.env.NEXTAUTH_SECRET,
});
