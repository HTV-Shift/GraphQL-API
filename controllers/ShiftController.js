const uuid                         = require('uuid-v4');
const Shift                     = require('../models/Shift');
const ShiftGate                 = require('../gates/ShiftGate');
const CreateShiftInputValidator = require('../validation/CreateShiftInputValidator');
const UpdateShiftInputValidator = require('../validation/UpdateShiftInputValidator');

class ShiftController {
    
    /**
     * Create a Shift
     * @param {*} obj 
     * @param {!{
     *  createShiftInput: !CreateShiftInput
     *  customer_id: !string
     * }} args 
     * @param {*} context 
     * @returns {!Promise<!Shift>}
     */
    static async create(obj, args, context) {

        //TODO: Retrieve customer using args.customer_id, check Customer.manager_id with context.employee._id
        await ShiftGate.can('create', context, args.manager_id);

        await CreateShiftInputValidator.validate(args.createShiftInput);

        const Shift = await new Shift({
            ...args.createShiftInput,
            salt: uuid(),
            created_at: new Date(),
            updated_at: new Date()
        }).save();

        return Shift;
    }

    /**
     * Update a Shift
     * @param {*} obj 
     * @param {!{
     *  updateShiftInput: !UpdateShiftInput
     *  shift_id: !string
     * }} args 
     * @param {*} context 
     * @returns {!Promise<!Shift>}
     */
    static async update(obj, args, context) {

        //TODO: Retrieve customer using Shift.customer_id, check Customer.manager_id with context.employee._id
        await ShiftGate.can('update', context, context.employee._id);

        await UpdateShiftInputValidator.validate(args.updateShiftInput);

        const shift = await Shift.findOne({_id: args.shift_id})
        if (!shift) {
            throw new Error(`Shift ${args.shift_id} not found in ShiftController.update`);
        }
        shift.set({...args.updateShiftInput, updated_at: new Date()});

        return await shift.save();
    }

    static async delete(obj, args, context) {
        try {
            //TODO: Retrieve customer using Shift.customer_id, check Customer.manager_id with context.employee._id
            await ShiftGate.can('delete', context, args.Shift_id);

            const Shift = await Shift.findOne({_id: args.Shift_id})
            if (!Shift) {
                throw new Error("Shift not found in ShiftController.delete");
            }
            await Shift.delete();   

            return `Shift ${args.Shift_id} has been deleted.`   

        } catch (error){
            throw new Error(error.message);
        }
    }
    
    static async get(obj, args, context) {
        await ShiftGate.can('get', context, args.Shift_id);

        let Shift = await Shift.findOne({_id: args.Shift_id});
        if (!Shift) {
            throw new Error('Invalid Shift ID.');
        }

        return Shift;
    }
    
}

module.exports = ShiftController;
