const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const schema = require('./schema/schema'); 
const resolver = require('./resolvers/resolvers'); 

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://klapointe:xDlaKaAYSrF0eQXK@comp3133-ex5.smmi6.mongodb.net/?retryWrites=true&w=majority&appName=comp3133-ex5', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Success: MongoDB connection');
    } catch (error) {
        console.error(`Unable to connect to DB: ${error.message}`);
    }
};

const startApolloServer = async () => { 
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolver,
    });

    const app = express();
    app.use(express.json());
    app.use(cors());

    await server.start();

    server.applyMiddleware({ app });

    const port = 4000;

    app.listen(port, () => {
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
        connectDB();
    });
};

startApolloServer();

