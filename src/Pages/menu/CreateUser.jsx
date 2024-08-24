import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { api } from "../../apiInstance/api";

export default function CreateUser() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const createUser = async () => {
    try {
      await api({
        method: "POST",
        url: "http://localhost:8008/api/users/register",
        data: newUser,
      });
      navigate("/Users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
        marginTop: 8,
        border: "1px solid #ccc",
        borderRadius: 4,
      }}
    >
      <TextField
        label="Name"
        name="name"
        value={newUser.name}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        value={newUser.email}
        onChange={handleInputChange}
        fullWidth
      />
      <Button variant="contained" onClick={createUser} color="primary">
        Create User
      </Button>
    </Box>
  );
}
