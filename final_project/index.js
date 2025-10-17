const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const public_routes = require('./router/general.js').general;
const auth_routes = require('./router/auth_users.js').authenticated;

const app = express();

app.use(session({ secret: "fingerpint", resave: true, saveUninitialized: true }));
app.use(express.json());

app.use("/", public_routes);  // Tasks 1–6
app.use("/", auth_routes);    // Tasks 7–9

const PORT = 5000;
app.listen(PORT, () => console.log("Server is running on port", PORT));