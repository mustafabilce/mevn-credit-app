const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    identificationNumber: String,
    nameSurname: String,
    monthlyIncome: String,
    phoneNumber: String,
    birthday: String,
    deposit: Number,
    creditScore: Number,
    creditResult: Boolean,
    creditLimit: Number,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Customers', customerSchema);