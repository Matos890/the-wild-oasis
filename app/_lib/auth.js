// app/_lib/auth.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Qui puoi aggiungere logica per controllare se l'utente è autorizzato
      return true; // Permetti l'accesso
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Export the signIn and signOut functions from the same instance
const { signIn, signOut } = NextAuth(authOptions);
export { signIn, signOut };