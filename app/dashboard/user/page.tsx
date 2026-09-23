const Page = async () => {

    interface User {
        id: number;
        name: string;
        username: string;
        email: string;
        address: {
          street: string;
          suite: string;
        };
        phone: string;
    }

    const response = await fetch('https://dummyjson.com/users');
    const {users} = await response.json() as {users: User[]};

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
       
          <div className='p-4 text-center text-amber-700'>

                        <h1>Name:{user.name}</h1>
                        <h1>Username:{user.username}</h1>
                        <h1>Email:{user.email}</h1>
                        <h1>Address:{user.address.street}, {user.address.suite}</h1>
                        <h1>Phone:{user.phone}</h1>
                         <hr />
                    </div>

       
      ))}
    </div>
  )
}

export default Page