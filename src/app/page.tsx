"use client"
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {

    const session = useSession()
    if (!session) redirect('/login');

    return (
        <div>
            <h1>Welcome to main page!</h1>
        </div>

    );
}
