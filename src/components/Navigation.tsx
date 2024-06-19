"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

type NavLink = {
    label: string;
    href: string;
};
type Props = {
    navLinks: NavLink[];
};

const Navigation = ({navLinks}: Props) => {
    const pathname = usePathname();
    const session = useSession();

    return (
        <>
            {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={isActive ? "active" : ""}
                    >
                        {link.label}
                    </Link>
                );
            })}
            {session?.data && <Link href={"/profile"}>Профиль</Link>}
            {session?.data?.user.role === "admin" && <Link href={"/admin-panel"}>Админка</Link>}
            {session?.data ? (
                <Link href="#" onClick={() => signOut({callbackUrl: "/login"})}>
                    Выйти
                </Link>
            ) : (
                <Link href={"/login"}>Войти</Link>
            )}
        </>
    );
};

export { Navigation };