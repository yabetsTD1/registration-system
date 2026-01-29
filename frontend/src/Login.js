import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);

      alert(res.data.message);

      // store token
      localStorage.setItem("token", res.data.token);

      console.log("User:", res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
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
        <button style={{ width: "100%", padding: 10 }}>Login</button>
      </form>
    </div>
  );
}
