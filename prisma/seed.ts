import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const roleAdmin = await prisma.globalRole.create({
        data: {name: "ADMIN"}
    })

    const roleUser = await prisma.globalRole.create({
        data: {
            name: "USER"
        }
    })

    const admin = await prisma.user.upsert({
        where: {email: 'admin@email.com'},
        update: {},
        create: {
            email: 'admin@email.com',
            name: 'Admin',
            globalRole: {connect: roleAdmin}
        },
    })
    const user = await prisma.user.upsert({
        where: {email: 'user@email.com'},
        update: {},
        create: {
            email: 'user@email.com',
            name: 'User',
            globalRole: {connect: roleUser}
        },
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })