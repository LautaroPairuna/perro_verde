// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { type AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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
          throw new Error("Faltan credenciales")
        }

        // 1) Verificamos que el email coincida
        if (credentials.email !== process.env.ADMIN_EMAIL) {
          throw new Error("Email incorrecto")
        }

        // 2) Comparación directa de la contraseña
        const plainPassword = "F3rn@nd0_p3rro_v3rde" // Contraseña en texto claro

        // 3) Debug: Verifica los valores de la contraseña ingresada y la almacenada
        console.log(">>> credentials.password (en texto claro):", credentials.password)
        console.log(">>> plainPassword (en texto claro):", plainPassword)

        // 4) Comparamos la contraseña en texto claro con la contraseña de la variable
        if (credentials.password !== plainPassword) {
          throw new Error("Contraseña incorrecta")
        }

        // 5) Devolvemos el usuario si la contraseña es correcta
        return { id: "1", name: "Admin", email: credentials.email }
      },
    }),
  ],
  pages: {
    signIn: "/admin/auth",  // Redirigir a tu página de login
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
