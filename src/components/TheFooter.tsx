"use client"
import { useSession } from "next-auth/react";

const TheFooter = () => {
    const session = useSession()

    return <footer>{`${JSON.stringify(session.data?.user)}`}</footer>;
};

export { TheFooter };