import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  if (!id)
    return NextResponse.json({
      data: [],
      message: "Product ID is required"
    }, { status: 400 })

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        thumbnails: true
      }
    });

    if (!product) {
      return NextResponse.json({
        data: {},
        message: "Product not found"
      }, { status: 404 })
    }

    return NextResponse.json({
      data: { product },
      message: "Product is fetched successfully"
    }, { status: 200 })
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({
        data: [],
        message: error.message
      }, { status: 500 })
  }
}


// export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
//   const { id } = await params
//   if (!id)
//     return NextResponse.json({
//       data: [],
//       message: "Product ID is required"
//     }, { status: 400 })

//   try {
//     const res = await fetch(`https://dummyjson.com/products/${id}`)
//     if (!res.ok) throw new Error("Error fetching product")
//     const data = await res.json()
//     return NextResponse.json({
//       data: { product: data },
//       message: "Product is fetched successfully"
//     }, { status: 200 })
//   } catch (error) {
//     if (error instanceof Error)
//       return NextResponse.json({
//         data: [],
//         message: error.message
//       }, { status: 500 })
//   }
// }