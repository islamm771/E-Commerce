import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



// export const GET = async (req: NextRequest) => {
//   try {
//     const res = await fetch(`https://dummyjson.com/products`)
//     if (!res.ok) throw new Error("Error fetching products")
//     const data = await res.json()
//     return NextResponse.json({
//       data,
//       message: "Products are fetched successfully"
//     }, { status: 200 })
//   } catch (error) {
//     if (error instanceof Error)
//       return NextResponse.json({
//         data: [],
//         message: error.message
//       }, { status: 500 })
//   }
// }



// export const GET = async (req: NextRequest) => {
//   try {
//     return NextResponse.json({
//       data: { products },
//       message: "Products are fetched successfully"
//     }, { status: 200 })
//   } catch (error) {
//     if (error instanceof Error)
//       return NextResponse.json({
//         data: [],
//         message: error.message
//       }, { status: 500 })
//   }
// }




export const GET = async (req: NextRequest) => {
  const q = req.nextUrl.searchParams.get("q")?.trim();

  const products = await prisma.product.findMany({
    where: q
      ? {
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
          { category: { contains: q } },
          { brand: { contains: q } },
        ],
      }
      : undefined,
    include: {
      thumbnails: true
    }
  });


  return NextResponse.json({
    data: { products: products ?? [] },
    message: "Products are fetched successfully"
  }, { status: 200 })
};