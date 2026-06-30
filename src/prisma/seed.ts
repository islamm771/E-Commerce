import { products } from "@/data/products";
import { prisma } from "../lib/prisma";


async function main() {
  await prisma.product.deleteMany();
  await prisma.thumbnail.deleteMany();

  // await prisma.user.create({
  //   data: {
  //     email: "islam@gmail.com",
  //     username: "islam7",
  //     firstName: "islam",
  //     lastName: "ibrahim",
  //     password: "12345",
  //     address: "alex",
  //     gender: "male",
  //     image: "",
  //   }
  // })

  for (const product of products) {
    await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
        image: product.image,

        thumbnails: {
          create: product.thumbnails.map((url) => ({
            url,
          })),
        },
      },
    });
  }

  console.log("✅ Products seeded successfully.");
}



main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });