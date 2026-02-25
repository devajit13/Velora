const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const productsPath = path.join(__dirname, "data/products.json");
const usersPath = path.join(__dirname, "data/users.json");

app.get("/products", (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsPath));
  res.json(products);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));