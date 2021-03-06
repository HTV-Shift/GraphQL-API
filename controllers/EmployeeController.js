const uuid                         = require('uuid-v4');
const Employee                     = require('../models/Employee');
const EmployeeGate                 = require('../gates/EmployeeGate');
const CreateEmployeeInputValidator = require('../validation/CreateEmployeeInputValidator');
const UpdateEmployeeInputValidator = require('../validation/UpdateEmployeeInputValidator');

class EmployeeController {
    
    /**
     * Create an Employee
     * @param {*} obj 
     * @param {!{
     *  createEmployeeInput: !CreateEmployeeInput
     *  manager_id: !string
     * }} args 
     * @param {*} context 
     * @returns {!Promise<!Employee>}
     */
    static async create(obj, args, context) {

        await EmployeeGate.can('create', context, args.manager_id);

        await CreateEmployeeInputValidator.validate(args.createEmployeeInput);

        const employee = await new Employee({
            ...args.createEmployeeInput,
            salt: uuid(),
            created_at: new Date(),
            updated_at: new Date()
        }).save();

        return employee;
    }

    /**
     * Update an existing Employee
     * @param obj 
     * @param {!{
     *  updateEmployeeInput: !UpdateEmployeeInput
     *  employee_id: !string
     * }} args 
     * @param context 
     * @returns {!Promise<!Employee>}
     */
    static async update(obj, args, context) {

        await EmployeeGate.can('update', context, args.employee_id);

        await UpdateEmployeeInputValidator.validate(args.updateEmployeeInput);

        const employee = await Employee.findOne({_id: args.employee_id})
        if (!employee) {
            throw new Error(`Employee ${args.employee_id} not found in EmployeeController.update`);
        }
        employee.set({...args.updateEmployeeInput, updated_at: new Date()});

        return await employee.save();
    }

    /**
     * Delete an Employee
     * @param {*} obj 
     * @param {!{
     *  employee_id: !string
     * }} args 
     * @param {*} context 
     * @returns {!Promise<!String>}
     */
    static async delete(obj, args, context) {
        try {
            await EmployeeGate.can('delete', context, args.employee_id);

            const employee = await Employee.findOne({_id: args.employee_id})
            if (!employee) {
                throw new Error("Employee not found in EmployeeController.delete");
            }
            await employee.delete();   

            return `Employee ${args.employee_id} has been deleted.`   

        } catch (error){
            throw new Error(error.message);
        }
    }
    
    /**
     * Retrieve an Employee from the database
     * @param {*} obj 
     * @param {!{
     *  employee_id: !string
     * }} args 
     * @param {*} context 
     * @returns {!Promise<!Employee>}
     */
    static async get(obj, args, context) {
        await EmployeeGate.can('get', context, args.employee_id);

        let employee = await Employee.findOne({_id: args.employee_id});
        if (!employee) {
            throw new Error('Invalid Employee ID.');
        }

        return employee;
    }
    
}

module.exports = EmployeeController;
