const express = require("express");

const { createCustomer, getCustomers, getCustomer, createDedicatedAccount, getDedicatedAccount, RequeryDedicatedAccount } = require('../config/paystack');

const router = express.Router();

// Get all customers on paystack
router.get("/", async (req, res) => {

    const customers = await getCustomers(req, res);

    res.json(customers);
    
});

// Create a customer on paystack
router.post("/", async (req, res) => {

    const data = JSON.stringify({
        "email": "customer@email.com",
        "first_name": "Zero",
        "last_name": "Sum",
        "phone": "+2348123456789",
        "metadata": {
            acc_bal: 0
        }
    })
    
    const customer = await createCustomer(data, res);

    res.json(customer)

});

// Get a single customer on paystack
router.get("/:email", async (req, res) => {

    const customer = await getCustomer(req, res);

    res.json(customer);
})

// Create a dedicated account for an existing customer on paystack
router.post("/dva/:email", async (req, res) => {

    const customer = await getCustomer(req, res);

    const data = JSON.stringify({
        "customer": customer.data.id, 
        "preferred_bank": "wema-bank"
    })
    
    const account = await createDedicatedAccount(data, res);

    res.json(account)

});

// Get dva
router.get("/dva/:email", async (req, res) => {
    const account = await getDedicatedAccount(req, res);

    res.json(account);
})

// Requery dva
router.get("/dva/requery/:email", async (req, res) => {
    const account = await RequeryDedicatedAccount(req, res);

    res.json(account);
})

module.exports = router;