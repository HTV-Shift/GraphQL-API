const mongoose       = require('mongoose');
const { pbkdf2 }     = require('crypto')
const mongooseDelete = require('mongoose-delete');

let employeeSchema = mongoose.Schema(
    {
        manager_id: mongoose.SchemaTypes.ObjectId,
        username: String,
        password: String,
        email_address: String,
        salt: String,
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
employeeSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true
});

module.exports = mongoose.model('Employee', employeeSchema);
