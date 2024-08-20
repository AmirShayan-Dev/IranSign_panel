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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8008/api/users/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Store token or user info here if needed
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
          error={!!error && !validateEmail(email)}
          helperText={
            !!error && !validateEmail(email) ? "Invalid email format" : ""
          }
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          sx={{ width: "700px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error && validateEmail(email) && !password}
          helperText={
            !!error && validateEmail(email) && !password
              ? "Password is required"
              : ""
          }
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
