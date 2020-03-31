const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FuelUpSchema = new Schema({
    // _id is automatically generated in Schema object
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    userId: { // TODO: This should auto populate with the employee ID inserting the data
        type: String,
        required: true
    },
    vehicleId: {
        type: String,
        required: true
    },
    fuelUpDate: {
        type: Date,
        required: true
    },
    miles: {
        type: Number,
        required: false,
    },
    mileStart: {
        type: Number,
        required: false,
    },
    mileEnd: {
        type: Number,
        required: true,
    },
    gallons: {
        type: Number,
        required: true,
    },
    mpg: {
        type: Number,
        required: false,
    },
    totalCost: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("FuelUp", FuelUpSchema);