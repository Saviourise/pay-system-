const express = require("express");
const cors = require("cors");

const CustomerRoute = require("./routes/Customer");

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.use("/customer", CustomerRoute);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "UBC Paystack DVA"
    });
});

app.listen(process.env.PORT || 2000, () => {
    console.log("Server is running on port 2000");
});