import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const roleAdmin = await prisma.role.create({
        data: {
            name: "ADMIN"
        }
    })

    const roleUser = await prisma.role.create({
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
            role: {connect: roleAdmin}
        },
    })
    const user = await prisma.user.upsert({
        where: {email: 'user@email.com'},
        update: {},
        create: {
            email: 'user@email.com',
            name: 'User',
            role: {connect: roleUser}
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