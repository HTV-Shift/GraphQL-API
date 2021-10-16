class ValidationRule {

    static isMaster(request) {
        return request.master;
    }

	static isManager(request, manager_id) {
        return request.employee._id.toString() === manager_id.toString();
    }
}

module.exports = ValidationRule;