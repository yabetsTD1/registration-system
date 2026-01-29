const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Signup API
app.post("/api/signup", async (req, res) => {
  const { Name, Phone, Email, Password } = req.body;

  if (!Name || !Phone || !Email || !Password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check if email already exists
  db.query("SELECT * FROM Registration WHERE Email = ?", [Email], async (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    db.query(
      "INSERT INTO Registration (Name, Phone, Email, Password) VALUES (?, ?, ?, ?)",
      [Name, Phone, Email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Insert error", error: err });

        res.status(201).json({ message: "User registered successfully ✅" });
      }
    );
  });
});

// ✅ Login API
app.post("/api/login", (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "Email and Password required" });
  }

  db.query("SELECT * FROM Registration WHERE Email = ?", [Email], async (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, Email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: { id: user.id, Name: user.Name, Phone: user.Phone, Email: user.Email },
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT} 🚀`);
});
