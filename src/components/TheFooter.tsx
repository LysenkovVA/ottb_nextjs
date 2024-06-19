"use client"
import { useSession } from "next-auth/react";

const TheFooter = () => {
    const session = useSession()

    return <footer>{`${session.data?.user?.email} (${JSON.stringify(session.data?.user?.role?.name)})`}</footer>;
};

export { TheFooter };