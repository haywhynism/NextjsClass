"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}

export default function ProductModal({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const router = useRouter();
	const [product, setProduct] = useState<Product>();

	useEffect(() => {
		async function fetchProduct() {
			const { slug } = await params;
			const response = await fetch(`https://fakestoreapi.com/products/${slug}`);
			const data: Product = await response.json();
			setProduct(data);
		}

		fetchProduct();
	}, [params]);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
			onClick={() => router.back()}
		>
			<div
				className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 text-black shadow-2xl"
				onClick={(event) => event.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-label="Product details"
			>
				<button
					type="button"
					onClick={() => router.back()}
					className="absolute right-4 top-4 rounded px-3 py-1 font-semibold hover:bg-gray-100"
				>
					Cancel
				</button>

				{product ? (
					<div className="pt-8">
						<Image
							src={product.image}
							alt={product.title}
							width={220}
							height={220}
							className="mx-auto"
						/>
						<h2 className="mt-4 text-2xl font-bold">{product.title}</h2>
						<p className="mt-2 text-gray-600">{product.description}</p>
						<p className="mt-4 font-semibold">Category: {product.category}</p>
						<p className="mt-2 font-semibold">Price: ${product.price}</p>
						<p className="mt-2">
							Rating: {product.rating.rate} ({product.rating.count} reviews)
						</p>
					</div>
				) : (
					<p className="pt-8">Loading product...</p>
				)}
			</div>
		</div>
	);
}
