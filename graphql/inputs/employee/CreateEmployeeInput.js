const gql = require('graphql-tag');

/**
 * @typedef {{
 *     manager_id: !string,
 * }} CreateEmployeeInput
 */

module.exports = gql`
input CreateEmployeeInput {
    manager_id: String!,
}
`;
