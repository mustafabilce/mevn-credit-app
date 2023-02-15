import axios from 'axios';
const url = '/api/customer';

export default class API {
    // to get all the customers from the server
    static async getAllCustomer(){
        const res = await axios.get(url);
        return res.data;
    }
    // to get single customer by id
    static async getCustomerByID(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
    // to insert customer in to database
    static async addCustomer(customer){
        const res = await axios.post(url, customer);
        return res.data;
    }
    // to update customer in to database
    static async updateCustomer(id, customer){
        const res = await axios.patch(`${url}/${id}`, customer);
        return res.data;
    }
    // to delete customer in to database
    static async deleteCustomer(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}