import Image from "next/image";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const response = await fetch(`https://fakestoreapi.com/products/${slug}`);
  const product = await response.json();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Image src={product.image} alt={product.title} width={300} height={300} className="mx-auto" />
      <h1 className="mt-6 text-3xl font-bold">{product.title}</h1>
      <p className="mt-3">{product.description}</p>
      <p className="mt-4 font-semibold">Category: {product.category}</p>
      <p className="mt-2 font-semibold">Price: ${product.price}</p>
    </div>
  )
}

export default Page