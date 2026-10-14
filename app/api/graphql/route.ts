import { ApolloServer } from "@apollo/server"
import { users } from "../login/route";
import { startServerAndCreateNextHandler } from "@as-integrations/next";



type User = {
    id: number
    name: string
    age: number
    email: string
    amount: number
    gender: string
    password: string
}

const allUsers: User[] = [
    { id: 1, name: "John", age: 20, email: "john3@abc.com", amount: 6000, gender: "Male", password: "fish" },
    { id: 2, name: "Shade", age: 25, email: "shade3@abc.com", amount: 4000, gender: "Female", password: "fish" },
    { id: 3, name: "Ola", age: 22, email: "ola3@abc.com", amount: 2000, gender: "Male", password: "fish" }

]

const typeDefs = `#graphql
 type User {
    id: ID!
    name: String!
    age: Int!
    email: String!
    amount: Int!
    gender: String!
    password: String!
}

type Query {
    users: [User!]!
}  

type Mutation {
     addUser(name: String! age: Int! email: String! amount: Int!, gender: String!, password: String!) : [User]!

     editUser(id: ID!, name: String, age: Int, email: String, amount: Int, gender: String, password: String): User

     deleteUser(id: ID!) : User
     }

type Query {
user(id: ID!): User
}

`

const resolvers = {
    Query: {
        users: () => {
            console.log('got it')
            return allUsers
        },

        user: (_: any, args: { id: string }) => {
            return users.find((user) => String(user.id) === args.id)
        }
    },

    Mutation: {
        addUser: (_: any, args: { name: string, age: number, email: string, amount: number, gender: string, password: string }) => {
            let { name, age, email, amount, gender, password } = args;
            let userObj = { name, age, email, amount, gender, password, id: allUsers.length + 1 }
            allUsers.push(userObj)
            return allUsers
        },

        editUser: (_: any, args: { id: number, name: string, age: number, email: string, amount: number, gender: string, password: string }) => {
            let { name, age, email, amount, gender, password, id } = args;
            let user = allUsers.find((u) => { return u.id == id })
            user = { ...{ id, name, age, email, amount, gender, password } }
            console.log(user)
            console.log(allUsers)
            allUsers[id - 1] = user
            console.log(allUsers)
            return allUsers[id - 1]
        },

       deleteUser: (_: any, args: { id: number }) => {
            const index = allUsers.findIndex((u) => u.id === args.id);

         

            const [deletedUser] = allUsers.splice(index, 1);
            return deletedUser;
        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const handler = startServerAndCreateNextHandler(server)

export { handler as GET, handler as POST }

