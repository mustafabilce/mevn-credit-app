const express = require('express');
const router = express.Router();
const API = require('../controllers/api');

router.get("/", API.fetchAllCustomer);
router.get("/:id", API.fetchCustomerByID);
router.post("/", API.createCustomer);
router.patch("/:id", API.updateCustomer);
router.delete("/:id", API.deleteCustomer);

module.exports = router;