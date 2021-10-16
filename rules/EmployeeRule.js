const ValidationRule = require('./ValidationRule');

class EmployeeRule {

    static async can(request, manager_id) {
        if (ValidationRule.isMaster(request) || ValidationRule.isManager(request, manager_id)) {
            return;
        }
        throw new Error('Forbidden by EmployeeRule');
    }
}

module.exports = EmployeeRule;
