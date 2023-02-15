const Customer = require('../models/customers');
const creditLimitMultiplier = 4;

module.exports = class API {
    // fetch all customers
    static async fetchAllCustomer(req, res) {
        try {
            const customers = await Customer.find();
            res.status(200).json(customers);
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    }
    // fetch all customer by ID
    static async fetchCustomerByID(req, res) {
        const id = req.params.id;
        try {
            const customer = await Customer.findById(id);
            res.status(200).json(customer);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    // create a customer
    static async createCustomer(req, res) {

        const customer = req.body;
        if(customer.creditScore < 500){
            try {
                customer['creditResult'] = false;
                customer['creditLimit'] = 0;
                await Customer.create(customer);
                res.status(201).json({ message: 'Kredi Başvurunuz Alındı!' })
            } catch (err) {
                res.status(400).json({ message: err.message })
            }
        } else if(customer.creditScore >= 500 && customer.creditScore < 1000) {
            if(customer.monthlyIncome < 5000){
                customer['creditResult'] = true;
                if(customer.deposit != null){
                    let depositAmount =  customer.deposit / 10;
                    customer['creditLimit'] = 10000 + depositAmount;
                } else {
                    customer['creditLimit'] = 10000;
                }
            } else if(customer.monthlyIncome > 5000 && customer.monthlyIncome <= 10000){
                customer['creditResult'] = true;
                if(customer.deposit != null){
                    let depositAmount =  customer.deposit / 5;
                    customer['creditLimit'] = 20000 + depositAmount;
                } else {
                    customer['creditLimit'] = 20000;
                }
            } else if (customer.monthlyIncome > 10000){
                customer['creditResult'] = true;
                if(customer.deposit != null){
                    let depositAmount =  customer.deposit / 4;
                    let test = customer.monthlyIncome * (creditLimitMultiplier / 2)
                    customer['creditLimit'] = test + depositAmount;
                } else {
                    customer['creditLimit'] = customer.monthlyIncome * (creditLimitMultiplier / 2);
                }
            } 
            try {
                await Customer.create(customer);
                res.status(201).json({ message: 'Kredi Başvurunuz Alındı!' })
            } catch (err) {
                res.status(400).json({ message: err.message })
            }  
        } else if(customer.creditScore >= 1000) {
            customer['creditResult'] = true;
            if(customer.deposit != null){
                let depositAmount =  customer.deposit / 2;
                customer['creditLimit'] = (customer.monthlyIncome * creditLimitMultiplier) + depositAmount; 
            } else {
                customer['creditLimit'] = customer.monthlyIncome * creditLimitMultiplier;
            }
            try {
                await Customer.create(customer);
                res.status(201).json({ message: 'Kredi Başvurunuz Alındı!' })
            } catch (err) {
                res.status(400).json({ message: err.message })
            }  
        }
    }
    // to update customer
    static async updateCustomer(req, res){
        const id = req.params.id;
        const newCustomer = req.body;
        try {
            const result = await Customer.findByIdAndUpdate(id, newCustomer);
            res.status(200).json({ message: "Kullanıcı başarıyla düzenlendi.", message_code: "SUCCESS" })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
    // to delete customer
    static async deleteCustomer(req, res){
        const id = req.params.id;
        try {
            const result = await Customer.findByIdAndDelete(id);
            res.status(200).json({ message: "Kullanıcı başarıyla silindi.", message_code: "SUCCESS" })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}