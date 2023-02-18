const fetch = require("node-fetch");

const MySecretKey = 'Bearer sk_live_247bc8ced8dbdeffc3172c5f9f8b89b0f00c601b';

// Create a customer on paystack
const createCustomer = async (req, res) => {

    const response = await fetch('https://api.paystack.co/customer', {
        method: 'POST',
        headers: {
            Authorization: MySecretKey,
            'Content-Type': 'application/json'
        },
        body: req
    });
    const data = await response.json();

    return data;
}

// Get all customers on paystack
const getCustomers = async (req, res) => {

    const response = await fetch('https://api.paystack.co/customer', {
        method: 'GET',
        headers: {
            Authorization: MySecretKey
        },
    });
    const data = await response.json();

    return data;
}

// Get a single customer on paystack
const getCustomer = async (req, res) => {

    const response = await fetch(`https://api.paystack.co/customer/${req.params.email}`, {
        method: 'GET',
        headers: {
            Authorization: MySecretKey
        },
    });
    const data = await response.json();

    return data;
}

// Create a dedicated account
const createDedicatedAccount = async (req, res) => {

    const response = await fetch('https://api.paystack.co/dedicated_account', {
        method: 'POST',
        headers: {
            Authorization: MySecretKey,
            'Content-Type': 'application/json'
        },
        body: req
    });
    const data = await response.json();

    return data;
}

// Get all dva on paystack
const getDedicatedAccounts = async (req, res) => {

    const response = await fetch(`https://api.paystack.co/dedicated_account`, {
        method: 'GET',
        headers: {
            Authorization: MySecretKey
        },
    });
    const data = await response.json();
console.log(data)
    return data;
}

// Get a single dva on paystack
const getDedicatedAccount = async (req, res) => {

    const customer = await getCustomer(req, res);

    const id = customer.data.dedicated_account.id;

   const response = await fetch(`https://api.paystack.co/dedicated_account/${id}`, {
        method: 'GET',
        headers: {
            Authorization: MySecretKey
        },
    });
    const data = await response.json();

    return data;
}

// Requery dva on paystack
const RequeryDedicatedAccount = async (req, res) => {

    const customer = await getCustomer(req, res);

    const id = customer.data.dedicated_account.id;

   const response = await fetch(`https://api.paystack.co/dedicated_account/requery?account_number=${customer.data.dedicated_account.account_number}&provider_slug=${customer.data.dedicated_account.bank.slug}$date=2023-02-14`, {
        method: 'GET',
        headers: {
            Authorization: MySecretKey,
            'Content-Type': 'application/json'
       },
        'maxRedirects': 20
    });
    const data = await response.json();

    return data;
}

module.exports = {createCustomer, getCustomers, getCustomer, createDedicatedAccount, getDedicatedAccounts, getDedicatedAccount, RequeryDedicatedAccount};
