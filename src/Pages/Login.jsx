import React, { useState } from "react";
import "./Login.css";
import { TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8008/api/users/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Assume response contains a token or user info that you can use for authentication
        // For example, you might store the token in localStorage
        // localStorage.setItem("token", response.data.token);

        // Navigate to the dashboard
        navigate("/Dashboard");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="main-div">
      <Box display="flex" flexDirection="column" gap={2} alignItems="center">
        <TextField
          label="Email"
          variant="outlined"
          sx={{ width: "700px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          sx={{ width: "700px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Button
          variant="contained"
          sx={{ width: "300px" }}
          onClick={handleLogin}
        >
          ورود
        </Button>
      </Box>
    </div>
  );
}

export default Login;
