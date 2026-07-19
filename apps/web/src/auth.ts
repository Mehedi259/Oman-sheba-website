import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
          const res = await fetch(`${baseUrl}/api/users/login/`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            }),
            headers: { "Content-Type": "application/json" }
          });
          
          if (!res.ok) {
            return null;
          }

          const data = await res.json();
          // Assuming Django returns { access: string, refresh: string, user: any } or similar
          if (data.access) {
            return {
              id: data.user?.id || '1',
              email: credentials.email,
              name: data.user?.name || credentials.email,
              accessToken: data.access,
              refreshToken: data.refresh
            } as any;
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      (session as any).accessToken = token.accessToken;
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
