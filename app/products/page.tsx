"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface products {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number
    };
}

const Page = () => {
    const router = useRouter();
    const [products, setproducts] = useState<products[]>();

    useEffect(() => {
        async function getAllProducts() {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            setproducts(data);
        }

        getAllProducts();
    }, [])

    async function showDetails(params: number) {
        router.push(`/products/${params}`);
    }

    return (
        <>
            <div className=''>
                <h1>This is product page</h1>

                {
                    products ? (
                        products.map((product) => (
                            <div onClick={() => showDetails(product.id)} key={product.id} className='text-amber-50 bg-amber-500 bg-blend-hard-light p-4 rounded-2xl border-2 border-amber-700 mx-auto mb-20 w-96 cursor-pointer'>
                                <Image src={product.image} alt={product.title} width={200} height={200} />
                                <h1>Title: {product.title}</h1>
                                <h1>Description: {product.description}</h1>
                                <h1>Category: {product.category}</h1>
                                <h1>Price: {product.price}</h1>
                                <h1>Rating: {product.rating.count}/{product.rating.rate}</h1>
                            </div>
                        ))
                    ) : (
                        <div>
                            <h1>No products yet</h1>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Page
