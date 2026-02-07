import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

const ADMIN_EMAIL = "admin@perroverde.com";
// Hardcode temporal del hash que sabemos es correcto
// Contraseña sin hashear: F3rn@nd0_p3rro_v3rde
const ADMIN_PASSWORD_HASH = "$2b$10$azuGYbIH.l1RzY995XjezubvA1X.B3Fy3NzEYqptgguO1Bs5f7yZG";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Administrador",
      credentials: {
        email:    { label: "Email", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        if (email !== ADMIN_EMAIL) {
          return null;
        }

        // Comparamos directamente contra el hash hardcodeado
        const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
        if (!isValid) {
          return null;
        }

        return { id: "1", name: "Admin", email: email };
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
      if (token.email && session.user) session.user.email = token.email as string;
      return session;
    },
  },
})
