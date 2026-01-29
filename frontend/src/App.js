import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

export default function App() {
  return (
    <Router>
      <div style={{ padding: 20, fontFamily: "Arial" }}>
        <h2>Auth System</h2>

        <nav style={{ marginBottom: 20 }}>
          <Link to="/signup" style={{ marginRight: 15 }}>Signup</Link>
          <Link to="/login">Login</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
