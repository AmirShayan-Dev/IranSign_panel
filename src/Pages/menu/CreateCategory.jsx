import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { api } from "../../apiInstance/api.jsx"; // Import the api function

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
    formData.append("file", image);

    api({
      url: "http://localhost:8008/api/create-category",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Category created:", response.data);
        navigate("/Category"); // Redirect to the category list
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
