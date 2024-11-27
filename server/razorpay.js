const express = require('express');
const Razorpay = require('razorpay');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');


app.use(express.json());

const razorpay = new Razorpay({
    key_id: 'rzp_test_W01s4dbDdvekyM',  // Replace with your test key
    key_secret: 'pLefOc5q4EANoTR7bsS6sSCV'  // Replace with your test secret
});

app.post('/razorpay', async (req, res) => {
    const { amount, currency, receipt } = req.body;
    const options = {
        amount: amount, // amount in paise
        currency: currency,
        receipt: receipt,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.log("Error creating Razorpay order:", error);
        res.status(500).send({ message: "Error creating order", error });
    }
});
app.use(express.static(path.join(__dirname, '../client/build'))); // Update this path

// The "catchall" handler: for any request that doesn't match one above, send back the React app.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html')); // Update this path
});


app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
