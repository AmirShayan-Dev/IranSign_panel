import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { api, getDataFromStorage } from "../../apiInstance/api.jsx"; // Import the apiInstance

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from the API
    api({
      url: "http://localhost:8008/api/category",
      method: "GET",
    })
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleImageChange = (event) => {
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

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", name);
    formData.append("content", content);
    const userId = JSON.parse(getDataFromStorage("userData", "local")).userId;
    formData.append("userId", userId);
    formData.append("catId", category);
    if (image) {
      formData.append("file", image);
    }

    const token = localStorage.getItem("token"); // Retrieve token from local storage

    api({
      url: "http://localhost:8008/api/create_product",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    })
      .then((response) => {
        console.log("Product created:", response.data);
        navigate("/products");
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  const handleReturn = () => {
    navigate("/products");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
      }}
    >
      <h1 style={{ fontSize: "1rem" }}>ایجاد محصول جدید</h1>
      <TextField
        label="نام محصول"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2, width: "100%" }}
      />
      <TextField
        label="توضیحات"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ marginBottom: 2, width: "100%" }}
      />
      <TextField
        select
        label="دسته بندی"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ marginBottom: 2, width: "100%" }}
      >
        {categories.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
        انتخاب عکس
        <input type="file" hidden onChange={handleImageChange} />
      </Button>
      {imagePreview && (
        <Box sx={{ marginBottom: 2, textAlign: "center" }}>
          <img
            src={imagePreview}
            alt="Product Preview"
            style={{ maxWidth: "100%", maxHeight: 200 }}
          />
          <p>{name}</p>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginBottom: 2 }}
      >
        ذخیره محصول
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleReturn}>
        بازگشت به لیست محصولات
      </Button>
    </Box>
  );
}
