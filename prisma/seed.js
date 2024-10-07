import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const guestbookEntries = [
    {
      name: "Budi Santoso",
      email: "budi.santoso@example.com",
      comment: "Wihh mantap banget nih website! Keren abis, bro! 😎👍",
    },
    {
      name: "Siti Nurhaliza",
      email: "siti.nur@example.com",
      comment: "Halo semua! Seru banget nih, semoga makin sukses ya! ✨",
    },
    {
      name: "Doni Pratama",
      email: "doni.pratama@example.com",
      comment: "Gw sih gasuka basa basi, pokoknya jos gandos! 😁🔥",
    },
    {
      name: "Rina Aprilia",
      email: "rina.aprilia@example.com",
      comment: "Ih, kece banget ini! Boleh dong gabung lagi lain kali! 🤩",
    },
    {
      name: "Andi Wibowo",
      email: "andi.wibowo@example.com",
      comment: "Website ini beneran gokil, ga nyangka! Semangat terus buat developernya! 🚀💪",
    },
  ];

  for (const entry of guestbookEntries) {
    await prisma.guestbookEntry.create({
      data: entry,
    });
  }

  console.log('Dummy data has been seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
