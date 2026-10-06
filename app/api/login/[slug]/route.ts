import User from "@/app/lib/models/Users";
import { connectDb } from "@/app/lib/util/db/connectDb";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ slug: string }> },) {
        await connectDb();
    const slug  = await params;
    console.log(slug)
     let data = await req.json();
     console.log(data);
     let user = await User.findOneAndUpdate(slug, data, {
        returnDocument: "after",
     }).then((user) => {
        if (!user) {
            return Response.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                }
            )
        }
        return Response.json({
            message: "User updated successfully",
            data: user,
        },
            {
                status: 200,
            }
        )
     }).catch((err) => {
        return Response.json(
            {
                message: "Error updating user",
                error: err.message,
            },
            {
                status: 500,
            }
        )
     })               
    return Response.json({
        message: "Patch request received",
    },
        {
            status: 200
        }
    )
    
}