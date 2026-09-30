import type { NextRequest } from "next/server";

interface Products {
    prodId: number,
    prodName: string,
    prodPrice: number,
    prodDescription: string,
    prodQuantity: number,

}

const allProduct: Products[] = [
    {
        prodId: 1,
        prodName: "Rice",
        prodPrice: 30000,
        prodDescription: "foreign nigeria rice, very sweet and affordable",
        prodQuantity: 30

    },
    {
        prodId: 2,
        prodName: "Beans",
        prodPrice: 10000,
        prodDescription: "brown beans, so sweet and yummy",
        prodQuantity: 30

    },
    {
        prodId: 3,
        prodName: "Ekuru",
        prodPrice: 25000,
        prodDescription: "made with white beans. You will love it so much",
        prodQuantity: 30

    },
    {
        prodId: 4,
        prodName: "Burger",
        prodPrice: 28000,
        prodDescription: "made with flower, chicken, yeast and yummy",
        prodQuantity: 30

    }
]

export async function GET() {
    return Response.json({
        message: "Products are available",
        data: allProduct,
    });
}

export async function POST(request: NextRequest) {
    const newProduct = await request.json();
    const product = { ...newProduct, prodId: allProduct.length + 1 };


    return Response.json({
        message: "Product added",
        data: [...allProduct, product],
    });
}

export async function PATCH(request: NextRequest) {
    const id = Number(request.nextUrl.searchParams.get("id"));
    const updates = await request.json();
    const product = allProduct.find((item) => item.prodId === id);

    if (!product) {
        return Response.json(
            {
                message: "Product not found"

            },
            {
                status: 404
            });
    }

    let newprod = { ...product, ...updates };

    return Response.json({
        message: "Product updated",
        data: newprod,
    });
}
