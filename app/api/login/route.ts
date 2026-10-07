import User from "@/app/lib/models/Users";
import { connectDb } from "@/app/lib/util/db/connectDb";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";


export default interface UserType {
    id: number;
    name: string;
    age: number;
    gender: string;
    amount: number;
    email: string;
    password: string
}

export const users: UserType[] = [
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
    await connectDb();
    const allUsers = await User.find();

    if (!allUsers) {
        return Response.json(
            {
                message: "No registered users",

            },
            {
                status: 404
            }
        )
    }
    return Response.json({
        message: "I got login request",
        data: allUsers,
    });
}

export async function POST(params: NextRequest) {

    let userDetails = await params.json();

    let user = await User.findOne({
        email: userDetails.email,

    });

    let passwordValidation = await bcrypt.compare(
        userDetails.password,
        user.password,
    );

    if (!passwordValidation) {
        return Response.json(
            {
                message: "Invalid password or email",
                data: "",
            },
            {
                status: 404,
            }
        )
    }




    // let newUser = await params.json();
    // console.log(newUser);
    // let newId = users.length + 1;
    // let user = users.find((c)=> {
    //     return c.email == newUser.email && c.password == newUser.password;
    // });
    // users.push({...newUser, id: newId});

    if (!user) {
        return Response.json(
            {
                message: "Invalid password or email",
                data: "",
            },
            {
                status: 404,
            }
        )
    }

    let SECRET = process.env.JWT_SECRET;

    if(!SECRET) {
        throw new Error("Secret REquired");
        
    }
    let token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            gender: user.gender,
        },
        SECRET,
        {
            expiresIn: "1h",
        },
    );

    (await cookies()).set(token, `token: ${token}`, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    })

    return Response.json({
        message: "login Successful",
        user,
        token,
    },
        {
            status: 200,
        }


    )
}





export async function PATCH(params: NextRequest) {
    const { searchParams } = new URL(params.url);
    const id = searchParams.get("id");
    console.log(id);
    let param = await params.json();

    let user = users.find((c) => c.id == Number(id));
    if (!user) {
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

    return Response.json(
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