const gql = require('graphql-tag');

/**
 * @typedef {{
 *     email_address: ?string,
 *     password: ?string,
 *     profile_picture: ?string,
 * }} UpdateEmployeeInput
 */

module.exports = gql`
input UpdateEmployeeInput {
    password: String,
    email_address: String,
    profile_picture: String,
}
`;
