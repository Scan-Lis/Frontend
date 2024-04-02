import { http } from "@/utils/http";
import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        correo: { label: "Email", type: "email", placeholder: "test@test.com" },
        contrasena: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const { correo, contrasena } = credentials;
          const res = await http.post("/auth/login", {
            correo,
            contrasena,
          });
          const jwt: string = res.data.token;
          const decoded = jwtDecode<{ rol: string }>(jwt as string);

          return res.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // if (user) {
      //   return {
      //     ...token,
      //     jwt: user.jwt,
      //   };
      // }
      // return token;

      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (token) {
        const decoded = jwtDecode<{ rol: string; email: string }>(
          token.token as string
        );
        session.jwt = token.token as string;
        session.user.rol = decoded.rol;
        session.user.email = decoded.email;
        console.log("Session", session);
      }
      return session;
      // session.user = token as any;
      // return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export default handler;
