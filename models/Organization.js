const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is what a developer would be assigned. They are allowed the highest priviledge.
const OrganizationSchema = new Schema({
    // _id is automatically generated in Schema object
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    organizationId: { // TODO: This should auto populate with the employee ID inserting the data. FK. This would be all Orgs.. Maybe array since superuser role will have all orgs?
        type: String,
        required: true
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    }
});

module.exports = mongoose.model("Organization", OrganizationSchema);