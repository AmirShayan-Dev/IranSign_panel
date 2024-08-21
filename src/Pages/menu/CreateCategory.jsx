import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    // Generate a preview of the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Handle form submission to create the category
  const handleCreateCategory = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    const token = localStorage.getItem(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImZ1bGxOYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MjQyNTM0ODIsImV4cCI6MTcyNDMzOTg4Mn0.8nyScfXExa2ri510EYUGffSqVKBtYStxiPnxPVa9ZAQ"
    ); // Retrieve token from local storage or wherever you store it

    axios
      .post("http://localhost:8008/api/create-category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      })
      .then((response) => {
        console.log("Category created:", response.data);
        navigate("/categories");
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
  };

  // Handle return to categories list
  const handleReturn = () => {
    navigate("/Category");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <h1>ایجاد دسته بندی جدید</h1>

      <TextField
        label="نام دسته بندی"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2, width: "50%" }}
      />

      <TextField
        label="توضیحات"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2, width: "50%" }}
      />

      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        انتخاب عکس
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>

      {/* Display the selected file name */}
      {image && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          فایل انتخاب شده: {image.name}
        </Typography>
      )}

      {/* Display image preview if available */}
      {imagePreview && (
        <Box
          component="img"
          src={imagePreview}
          alt="Selected"
          sx={{ width: "200px", height: "200px", objectFit: "cover", mb: 2 }}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateCategory}
        sx={{ mb: 2 }}
      >
        ایجاد
      </Button>

      <Button variant="outlined" color="secondary" onClick={handleReturn}>
        بازگشت
      </Button>
    </Box>
  );
}
