import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "../../prisma/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authConfig: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: {label: 'email', type: 'email', required: true},
                password: {label: 'password', type: 'password', required: true},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                const currentUser =
                    await prisma.user.findFirst({where: {email: credentials.email}, include: {globalRole: true}})

                if (currentUser) {
                    return currentUser as User;
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    /**
     * https://authjs.dev/guides/role-based-access-control#persisting-the-role
     */
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.role = user.role
                token.globalRole = user.globalRole
            }
            return token
        },
        // Для использования в клиентских приложениях
        async session({session, token}) {
            if (session.user) {
                session.user.role = token.role;
                session.user.globalRole = token.globalRole
            }

            return session
        },
        async authorized({auth}) {
            // Пользователь в прниципе авторизован,
            // далее все проверки по ролям в middleware
            return !!auth
        }
    },
}

