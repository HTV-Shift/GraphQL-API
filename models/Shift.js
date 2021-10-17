const mongoose       = require('mongoose');
const { pbkdf2 }     = require('crypto')
const mongooseDelete = require('mongoose-delete');

let toFrom = {
  to: String,
  from: String,
}

let dateTime = {
  
}

let shiftSchema = mongoose.Schema(
    {
        employee_id: mongoose.SchemaTypes.ObjectId,
        shift_schedule: {

        }
        //schedule
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

/**
* Add .delete method to model
*/
shiftSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true
});

module.exports = mongoose.model('Shift', shiftSchema);
