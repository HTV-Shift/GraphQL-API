const gql = require('graphql-tag');

/**
 * @typedef {{
 *     username: !string,
 *     password: !string,
 *     email_address: !string,
 *     vendor_id: !string,
 * }} CreateEmployeeInput
 */

module.exports = gql`
input CreateEmployeeInput {
    username: String!,
    password: String!,
    email_address: String!,
    vendor_id: String!,
}
`;
