const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const emailRegex    = /\S+@\S+\.\S+/;
/**
 * Validation for UpdateEmployeeInput
 * @param {!{ updateEmployeeInput: !UpdateEmployeeInput }} input
 * @returns {Boolean}
 */
class UpdateEmployeeInputValidator {
    static validate(input) {
        try {
            if (input.email_address && !input.email.match(emailRegex)) {
                throw new Error('Invalid Email');
            }
            if (input.password && !input.password.match(passwordRegex)) {
                throw new Error('Invalid Password');
            }
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = UpdateEmployeeInputValidator;
