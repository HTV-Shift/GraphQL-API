const gql = require('graphql-tag');


module.exports = gql`
extend type Mutation {

    "Create a new employee."
    createEmployee(
        "Employee to create."
        createEmployeeInput: CreateEmployeeInput!
    ): Employee

    "Update an employee."
    updateEmployee(
        "Employee ID."
        employee_id: String!,
        "New employee properties."
        updateEmployeeInput: UpdateEmployeeInput!
    ): Employee

    "Delete an employee."
    deleteEmployee(
        "Employee ID."
        employee_id: String!
    ): String
}
`;
