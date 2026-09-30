import mongoose from 'mongoose';

let isConnected = false
const URI = process.env.MONGO_URI

export async function connectDb() {
    if (isConnected) {
        return
    }
    if (!URI) {
        throw new Error('Mongo uri not provided')
    }
    try {
        await mongoose.connect(URI)
        isConnected = true
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error connecting to the database", error)
        throw error
    }
}