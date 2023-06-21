import { PrismaClient } from '@/client'

const prisma = new PrismaClient()
const main = async () => {
  await prisma.$transaction([
    prisma.example.createMany({
      data: [
        {
          id: 1,
          name: '#name1',
        },
        {
          id: 2,
          name: '#name2',
        },
      ],
    }),
  ])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
