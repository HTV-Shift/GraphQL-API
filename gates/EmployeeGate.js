
const EmployeeRule = require('../rules/EmployeeRule');

class EmployeeGate {
	static can(action, request, manager_id) {
        switch (action) {
			case 'create':
				return EmployeeRule.can(request, manager_id);
			case 'update':
				return EmployeeRule.can(request, manager_id);
			case 'delete':
				return EmployeeRule.can(request, manager_id);
			case 'get':
				return EmployeeRule.can(request, manager_id);
			default:
				throw new Error("Error in EmployeeGate");
		}
	}
}

module.exports = EmployeeGate;