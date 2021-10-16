const gql = require('graphql-tag');

module.exports = gql`
extend type Query {
    "Query a specific employee"
    employee(_id: String!): Employee
}
`;
