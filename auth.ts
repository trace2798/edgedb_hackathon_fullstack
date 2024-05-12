import authConfig from "@/auth.config";
import { EdgeDBAdapter } from "@auth/edgedb-adapter";
import { createClient } from "edgedb";
import NextAuth from "next-auth";
import { getAccountByUserId, getUserById } from "./actions/user";
export const client = createClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      console.log(session.user);
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      console.log({ existingUser });
      if (!existingUser) return token;
      const existingAccount = await getAccountByUserId(existingUser.id);
      console.log({ existingAccount });
      console.log(token)
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      return token;
    },
  },
  adapter: EdgeDBAdapter(client),
  session: { strategy: "jwt" },
  ...authConfig,
});
