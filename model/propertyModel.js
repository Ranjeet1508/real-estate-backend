const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    location: { type: String, required: true },
    priceRange: { type: String, required: true },
    description: { type: String, required: true },
    brokerContact: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v); // Validates if the string is exactly 10 digits
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
});

const PropertyModel = mongoose.model("property", propertySchema);

module.exports = {
    PropertyModel
}
