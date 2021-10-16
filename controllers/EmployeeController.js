const uuid                         = require('uuid-v4');
const Employee                     = require('../models/Employee');
const CreateEmployeeInputValidator = require('../validation/input_validation/CreateEmployeeInputValidator');
const UpdateEmployeeInputValidator = require('../validation/input_validation/UpdateEmployeeInputValidator');

class EmployeeController {
    
    static async create(obj, args, context) {

        //check employee gate

        await CreateEmployeeInputValidator.validate(args.createEmployeeInput);

        const employee = await new Employee({
            ...args.createEmployeeInput,
            salt: uuid(),
            created_at: new Date(),
            updated_at: new Date()
        }).save();

        return employee;
    }

    static async update(obj, args, context) {

        //check employee gate

        await UpdateEmployeeInputValidator.validate(args.updateEmployeeInput);

        const employee = await Employee.findOne({_id: args.employee_id})
        if (!employee) {
            throw new Error(`Employee ${args.employee_id} not found in EmployeeController.update`);
        }
        employee.set({...args.updateEmployeeInput, updated_at: new Date()});

        return await employee.save();
    }

    static async delete(obj, args, context) {
        try {
            
            //check employee gate

            const employee = await Employee.findOne({_id: id})
            if (!employee) {
                throw new Error("Employee not found in EmployeeController.delete");
            }
            await employee.delete();   
            return `Employee ${args.id} has been deleted.`         
        } catch (error){
            throw new Error(error.message);
        }
    }
}

module.exports = EmployeeController;
