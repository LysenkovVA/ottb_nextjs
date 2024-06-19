import NextAuth from "next-auth";
import { authConfig } from "@/configs/authConfig";

export const {auth, signIn, signOut, handlers: {GET, POST}} = NextAuth({
    ...authConfig,
});

