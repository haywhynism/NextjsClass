import User from "@/app/lib/models/Users";
import { connectDb } from "@/app/lib/util/db/connectDb";

export async function POST(req: Request) {
    await connectDb();
    const data = await req.json();
    const newUser = await User.create(data);

    if (!newUser) {
        return Response.json(
            {
                message: "Failed to create User"
            },
            {
                status: 401
            }
        )
        
    }

    return Response.json(
        {
            message: "User created successfully",
            data: newUser,
        },
        {
            status: 201
        }
    );
}