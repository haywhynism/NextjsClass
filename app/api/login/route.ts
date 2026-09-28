import {NextRequest} from "next/server";

interface User {
    id: number;
    name: string;
    age: number;
    gender: string;
    amount: number;
    email: string;
    password: string
}

const users: User[] = [
    {
        id: 1,
        name: "John Doe",
        age: 20,
        gender: "male",
        amount: 2000,
        email: "john@gmail.com",
        password: "fish",
    },
    {
        id: 2,
        name: "John oe",
        age: 25,
        gender: "female",
        amount: 4000,
        email: "jane54hh@gmail.com",
        password: "fish456",
    },
    {
        id: 3,
        name: "John Doe",
        age: 20,
        gender: "male",
        amount: 2000,
        email: "john@gmail.com",
        password: "fish@12",
    },
    {
        id: 4,
        name: "Josiah",
        age: 40,
        gender: "male",
        amount: 5000,
        email: "josiah@gmail.com",
        password: "fish34",
    },
    {
        id: 5,
        name: "Jesse",
        age: 50,
        gender: "male",
        amount: 9000,
        email: "jesse@gmail.com",
        password: "fish90!",
    },
]

export async function GET() {
    return Response.json ({
        message: "I got login request",
        data: users,
    });
}

export async function POST(params: NextRequest) {
    let newUser = await params.json();
    console.log(newUser);
    let newId = users.length + 1;
    let user = users.find((c)=> {
        return c.email == newUser.email && c.password == newUser.password;
    });
    // users.push({...newUser, id: newId});

    if (!user) {
       return Response.json(
        {
            message: "I got your login post request",
            data: "Invalid password or email",
        },
        {
            status: 404,
        }
       ) 
    }
    return Response.json({
        message: "I got your login request",
        data: users,
    },
    {
        status: 200,
    }
)
}

export async function PATCH(params: NextRequest) {
    const {searchParams} = new URL(params.url);
    const id = searchParams.get("id");
    console.log(id);
    let param = await params.json();

    let user = users.find((c)=> c.id == Number(id));
    if (!user){
        return Response.json(
            {
                message: "I got your login post request",
                data: "User not found",
            },
            {
                status: 404
            }
        )
    }

    return Response.json (
        {
            message: "I got your login post request",
            data: {
                updatedUser: user,
                allUser: users,
            },
        },
        {
            status: 201
        }
    )

}