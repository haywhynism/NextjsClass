const Page = async ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    const response = await fetch(`https://dummyjson.com/users/${slug}`);
    const user = await response.json();

  return (
    <div>
        <h1>{user.firstName} {user.lastName}</h1>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
    </div>
  )
}

export default Page