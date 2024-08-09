import React from "react";
import "./Login.css";
import { TextField, Box, Button } from "@mui/material";

export default function Login() {
  return (
    <div className="main-div">
      <Box display="flex" flexDirection="column" gap={2} alignItems="center">
        <TextField label="Email" variant="outlined" sx={{ width: "700px" }} />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          sx={{ width: "700px" }}
        />
        <Button variant="contained" sx={{ width: "300px" }}>
          ورود
        </Button>
      </Box>
    </div>
  );
}
