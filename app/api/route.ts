
import {NextRequest} from "next/server";
import { connectDb } from "../lib/util/db/connectDb";

interface User {
    id: number;
    name: string;
    age: number;
    gender: string;
    amount: number;
 
}

const users: User[] = [
    {
        id: 1,
        name: "John Doe",
        age: 20,
        gender: "male",
        amount: 2000,
        
    },
    {
        id: 2,
        name: "John oe",
        age: 25,
        gender: "female",
        amount: 4000,
      
    },
    {
        id: 3,
        name: "John Doe",
        age: 20,
        gender: "male",
        amount: 2000,
       
    },
    {
        id: 4,
        name: "Josiah",
        age: 40,
        gender: "male",
        amount: 5000,
       
    },
    {
        id: 5,
        name: "Jesse",
        age: 50,
        gender: "male",
        amount: 9000,
        
    },
];

export async function GET() {
    await connectDb()
    return Response.json ({
        message: "I got your request",
        data: users,
    });
}

export async function POST(params: NextRequest) {
    let newUser = await params.json();
    console.log(newUser);
    let newId = users.length + 1;
    users.push({...newUser, id: newId});
    return Response.json({
        message: "I got your post request",
        date: users
    })
}