// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const ADMIN_EMAIL = "admin@perroverde.com";
// Hardcode temporal del hash que sabemos es correcto
// Contraseña sin hashear: F3rn@nd0_p3rro_v3rde
const ADMIN_PASSWORD_HASH = "$2b$10$azuGYbIH.l1RzY995XjezubvA1X.B3Fy3NzEYqptgguO1Bs5f7yZG";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Administrador",
      credentials: {
        email:    { label: "Email", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Faltan credenciales");
        }

        if (credentials.email !== ADMIN_EMAIL) {
          throw new Error("Email incorrecto");
        }

        // Comparamos directamente contra el hash hardcodeado
        const isValid = await bcrypt.compare(credentials.password, ADMIN_PASSWORD_HASH);
        if (!isValid) {
          throw new Error("Contraseña incorrecta");
        }

        return { id: "1", name: "Admin", email: credentials.email };
      },
    }),
  ],
  pages: { signIn: "/admin/auth" },
  secret: "temporal-dev-secret", // Puedes dejar un secreto fijo en dev
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (token.email) session.user!.email = token.email as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
