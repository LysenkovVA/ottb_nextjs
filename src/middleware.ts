import NextAuth from "next-auth";
import { authConfig } from "@/configs/authConfig";
import { ADMIN_ROUTES, USER_ROUTES } from "@/consts/routes";
import { NextResponse } from "next/server";

const {auth} = NextAuth(authConfig);


export default auth((req) => {
    const {nextUrl} = req;

    const isAuthenticated = !!req.auth;

    // Если пользователь не авторизонван, перенаправляем на страницу входа
    if (!isAuthenticated) {
        return Response.redirect(new URL("/login", nextUrl));
    }

    // Проверка доступа по ролям
    if (ADMIN_ROUTES.some((admin_route) => {
        return nextUrl.pathname.startsWith(admin_route)
    }) && req?.auth?.user.role !== "admin") {
        return NextResponse.rewrite(new URL("/denied", req.url))
    }

    if (USER_ROUTES.some((user_route) => {
        return nextUrl.pathname.startsWith(user_route)
    }) && req?.auth?.user.role !== "user") {
        return NextResponse.rewrite(new URL("/denied", req.url))
    }
});

// Матчер для защищенных маршрутов
export const config = {
    matcher: [
        '/profile',
        "/admin-panel"
    ],
};