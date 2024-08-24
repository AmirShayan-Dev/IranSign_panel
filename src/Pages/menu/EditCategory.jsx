import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../apiInstance/api.jsx";

export default function EditCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch category details for editing
  useEffect(() => {
    if (id) {
      api({
        url: `http://localhost:8008/api/category/${id}`,
        method: "GET",
      })
        .then((response) => {
          const category = response.data.data;
          setName(category.name);
          setDescription(category.description);
          if (category.imageUrl) {
            setImagePreview(category.imageUrl);
          }
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
        });
    }
  }, [id]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

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

  const handleUpdateCategory = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("file", image);

    api({
      url: `http://localhost:8008/api/update-category/${id}`,
      method: "PUT",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Category updated:", response.data);
        navigate("/Category");
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

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
      <h1>ویرایش دسته بندی</h1>

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

      {image && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          فایل انتخاب شده: {image.name}
        </Typography>
      )}

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
        onClick={handleUpdateCategory}
        sx={{ mb: 2 }}
      >
        ذخیره تغییرات
      </Button>

      <Button variant="outlined" color="secondary" onClick={handleReturn}>
        بازگشت
      </Button>
    </Box>
  );
}
