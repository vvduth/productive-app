import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { db } from "./db";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    error: "/sign-in",
    signIn: "/sign-in",
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GG_CLIENTID!,
      clientSecret: process.env.GG_CLIENTSEC!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID!,
      clientSecret: process.env.GITHUB_CLIENTSEC!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "Name",
        },
        email: {
          label: "email",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email ||!credentials?.password) {
            throw new Error("Plase enter email and passoword")
        }

        const user = await db
      }
    }),
  ],
};
