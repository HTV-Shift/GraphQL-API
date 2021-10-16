const Employee = require('../models/Employee')

module.exports = (context) => {
    try {
        const id = context.header('authorization');
        if (id) {
            Employee.findOne({ _id: id }).then(Employee => {
                if (!Employee || Employee.manager_id) {
                    return Promise.reject();
                } 
                context.employee = Employee
            })
        } 
        context.next();
    } catch {
        context.next();
    }
};
