import { PrismaClient } from '@prisma/client'
//@ts-ignore
import { users } from './constants/user'
//@ts-ignore
import { registries } from './constants/registries'

const prisma = new PrismaClient()

async function main() {

  await prisma.clockRegistry.deleteMany()
  await prisma.user.deleteMany()
  await prisma.employee.deleteMany()

  const usersSeed = users.map((user) => {
    return prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
        employee: {
            create: {
                registration: user.registration,
                address: user.address,
                cpf: user.cpf,
                job_role: user.job_role,
                pib: user.pib,
                telphone: user.telphone,
                celphone: user.celphone,
                name: user.name,
            }
        }
      }
    })
  })

  const registriesSeed = registries.map(registry => {
    return prisma.clockRegistry.create({
      data: {
        id: registry.id,
        category: registry.category,
        is_business_day: registry.is_business_day,
        created_at: registry.created_at,
        marked_at: registry.marked_at,
        updated_at: registry.marked_at,
        user_id: registry.user.id
      }
    })
  })

  await prisma.$transaction([
    ...usersSeed,
    ...registriesSeed
  ])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
