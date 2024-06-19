import { auth } from "../../../../../auth";

export default async function Profile() {
    const session = await auth()

    if (!session?.user) {
        return (<div>Loading...</div>)
    }


    return (
        <div>
            <h1>Profile</h1>
            <h2>{session?.user?.name}</h2>
            <h3>{session?.user?.email}</h3>
            <h3>Role: {session?.user?.role}</h3>
        </div>
    );
}