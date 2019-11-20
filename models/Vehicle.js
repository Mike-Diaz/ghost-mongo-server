const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    // _id is automatically generated in Schema object
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    vehicleNum: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    vin: {
        type: String,
        required: false // Some fleets may include vehicles/equipment with no VIN
    },
    userId: { // TODO: This should auto populate with the user ID inserting the data
        type: String, // This is to show which employee created the vehicle
        required: true
    }
});

module.exports = mongoose.model("Vehicle", VehicleSchema);