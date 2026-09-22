"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    interface User {
        id: number;
        name: string;
        username: string;
        email: string;
        address: {
            street: string;
            suite: string;
            city: string;
        };
        phone: string;
    }

    const router = useRouter();
    const [users, setusers] = useState<User[]>();

    useEffect(()=> {
        async function fetchUsers() {
            const data = await fetch("https://jsonplaceholder.typicode.com/users");
            const allUsers: User[] = await data.json();
            setusers(allUsers);
        }

        fetchUsers();
    }, []);

    const userDetails = (params: { id:number; username: string})=>{
        router.push(`/profile/${params.id}`)
    }
  return (
    <>
        <div>
            <h1 className='text-center text-5xl'>Welcome to User dashboard</h1>

            {users? (
                users.map((user)=>(
                    <div className='p-4 text-center text-amber-700' key={user.id} onClick={() => userDetails({id: user.id, username: user.username})}>

                        <h1>Name:{user.name}</h1>
                        <h1>Username:{user.username}</h1>
                        <h1>Email:{user.email}</h1>
                        <h1>Address:{user.address.street}, {user.address.suite}</h1>
                        <h1>Phone:{user.phone}</h1>
                         <hr />
                    </div>
                   
                ))
            ): (
                <h1 className='text-2xl text-red-300 mt-19'>
                    Failed to fetch Users
                </h1>
            )}
        </div>
    
    </>
  )
}

export default Page