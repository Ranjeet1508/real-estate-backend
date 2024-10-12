const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    mobile: {type: String, required: true},
    email: { 
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {type: String, required: true},
})

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel
}