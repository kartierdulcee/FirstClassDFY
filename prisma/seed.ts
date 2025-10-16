import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? "ops@firstclassai.com";
  const adminName = process.env.ADMIN_SEED_NAME ?? "First Class Ops";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: Role.ADMIN, name: adminName },
    create: {
      email: adminEmail,
      name: adminName,
      role: Role.ADMIN,
    },
  });

  console.log(`✅ Seeded admin user ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
