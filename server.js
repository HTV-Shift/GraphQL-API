
const mongoose       = require('mongoose');
const express        = require('express');
const app            = express();
const {ApolloServer} = require('apollo-server-express');
const typeDefs       = require('./graphql/typeDefs');
const controllers    = require('./controllers')
const middlewares    = require('./middlewares')

const dotenv         = require('dotenv');
dotenv.config();

const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const resolvers = {
    Query: {
        employee: controllers.EmployeeController.get,
    },
    Mutation: {
        createEmployee: controllers.EmployeeController.create,
        updateEmployee: controllers.EmployeeController.update,
        deleteEmployee: controllers.EmployeeController.delete,
    },
    Shift: {
        //createShift
        //updateShift
        //deleteShift
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(middlewares.authenticationMiddleware);

/**
 * @typedef {{
 *     master: ?boolean,
 *     employee: ?Employee,
 *     body: {
 *         query: !string,
 *         variables: !Object
 *     },
 *     headers: !Object.<!string, !string>,
 *     connection: !Object
 *     identifier: ?string
 * }} RequestContext
 */
const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    context: ({req}) => ({
        employee: req.employee,
    }),
    debug: false,
    formatError: error => {
        return error;
    },
    playground: true,
    introspection: true,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
});

Promise.resolve(server.start()).then(() => {

    server.applyMiddleware({app});

    if (require.main === module && process.env.NODE_ENV !== 'test') {
        startHttpServer();
    }
    
})

let isMongooseConnected = false;

const connectToMongoose = async () => {
    if (isMongooseConnected) {
        return;
    }
    const mongoUrl = process.env.MONGO_URL;
    try {
        await mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('MongoDB connected');
        isMongooseConnected = true;
    } catch (e) {
        console.error('Failed to connect to MongoDB: ', mongoUrl);
        console.error(e);
    }
};

const startHttpServer = async () => {
    const portNumber = process.env.PORT;
    await Promise.resolve(connectToMongoose());

    return app.listen(portNumber, () => {
        console.log(`Go to http://localhost:${portNumber}/graphql to run queries!`);
    });
};

module.exports = {
    startHttpServer,
};
