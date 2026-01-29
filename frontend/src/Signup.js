import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/signup", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h3>Signup</h3>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="Name"
          placeholder="Name"
          value={form.Name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <input
          type="text"
          name="Phone"
          placeholder="Phone"
          value={form.Phone}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={form.Email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={form.Password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <button style={{ width: "100%", padding: 10 }}>Signup</button>
      </form>
    </div>
  );
}
