const { typeDefs: scalarTypeDefs } = require('graphql-scalars');

module.exports = [
    ...require('./inputs'),
    ...require('./types'),
    ...scalarTypeDefs,
];
