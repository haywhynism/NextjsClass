import { ApolloServer } from "@apollo/server"
import { users } from "../login/route";
import { startServerAndCreateNextHandler } from "@as-integrations/next";


const typeDefs = `#graphql
type User {
    id: ID!
    name: String!
    age: Int!
    email: String!
    amount: Int!
}

type Query {
    users: [User!]!
}  

type Query {
user(id: ID!): User
}

`

const resolvers = {
    Query: {
        users: ()=> users,

        user: (_: any, args: {id: string})=>{
            return users.find((user)=> String (user.id)=== args.id)
        }
    },
}

const server = new ApolloServer ({
    typeDefs,
    resolvers
})

const handler = startServerAndCreateNextHandler(server)

export {handler as GET, handler as POST}

