const usernameRegex = /^[a-zA-Z0-9]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const emailRegex    = /\S+@\S+\.\S+/;

/**
 * Validation for CreateEmployeeInput
 * @param {!{ createEmployeeInput: !CreateEmployeeInput }} input
 * @returns {Boolean}
 */
class CreateEmployeeInputValidator {
    static async validate(input){
        try {
            const {vendor_id, username} = input

            let vendor = await Vendor.findOne({_id: vendor_id});
            if (!vendor) {
                throw new Error(`Vendor with ID ${vendor_id} does not exist.`);
            }
            let employee = await Employee.findOne({ username: username });
            if (employee) {
                throw new Error(`Employee with username ${username} already exists.`)
            }
            if (!input.email.match(emailRegex)) {
                throw new Error('Invalid Email');
            }
            if(!input.username.match(usernameRegex)) {
                throw new Error('Invalid Username');
            }
            if(!input.password.match(passwordRegex)) {
                throw new Error('Your password must be minimum 8 letters long, with at least one symbol, an upper and lower case letter and a number.');
            }
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = CreateEmployeeInputValidator;