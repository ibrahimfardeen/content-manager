import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.VITE_GOOGLE_CLIENT_ID,
      clientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };