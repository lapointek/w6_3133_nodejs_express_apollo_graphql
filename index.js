const {ApolloServer} = require('apollo-server')
const {typeDefs} = require('./schema/schema')
const resolvers = require('./resolvers/resolvers')

async function startApolloServer(typeDefs, resolvers){
    const context = {
        db: context.db
    }
    const server = new ApolloServer({typeDefs,resolvers,context})
    await server.listen().then(({url}) => {
        return console.log(`Server ready at ${url}`)
    });
}

startApolloServer(typeDefs, resolvers)