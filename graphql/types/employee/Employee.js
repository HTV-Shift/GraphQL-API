const gql = require('graphql-tag');

module.exports = gql`
"An employee account."
type Employee {
    "Unique Employee identification."
    _id: ObjectID!

    "Unique username for employee"
    username: String!

    "The hashed password for the employee."
    password: String!

    "The employee's email address."
    email_address: EmailAddress!

    "The time this Employee was created."
    created_at: Date!

    "The last time this Employee was updated."
    updated_at: Date!
}
`;
