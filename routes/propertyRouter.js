const express = require('express');
const { PropertyModel } = require('../model/propertyModel');
const { authentication } = require('../middleware/authentication');
const propertyRoute = express.Router();


propertyRoute.get('/', async (req, res) => {
    try {
        const properties = await PropertyModel.find(); // Fetch all properties from MongoDB
        const reversed_properties = properties.reverse();
        return res.status(200).json(reversed_properties);
    } catch (err) {
        return res.status(500).json({ message: 'Server Error', error: err.message });
    }
})


propertyRoute.post('/',authentication, async (req, res) => {
    const { location, priceRange, brokerContact, description } = req.body;

    try {
        const newProperty = new PropertyModel({
            location,
            priceRange,
            brokerContact,
            description,
        });

        const savedProperty = await newProperty.save(); // Save the new property
        return res.status(201).json(savedProperty);
    } catch (err) {
        return res.status(500).json({ message: 'Server Error', error: err.message });
    }
})

propertyRoute.patch('/:id',authentication, async (req, res) => {
    try {
        const updatedProperty = await PropertyModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Update only the fields present in req.body
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        return res.status(200).json(updatedProperty);
    } catch (err) {
        return res.status(500).json({ message: 'Server Error', error: err.message });
    }
})

propertyRoute.delete('/:id', authentication, async (req, res) => {
    try {
        const deletedProperty = await PropertyModel.findByIdAndDelete(req.params.id);

        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        return res.status(200).json({ message: 'Property deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Server Error', error: err.message });
    }
})

module.exports = {
    propertyRoute
}


