import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { api, getDataFromStorage } from "../../apiInstance/api.jsx";

export default function CreateArticle() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoName(file.name);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !photo || !description) {
      setError("Please fill in all fields and upload a photo.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    const userId = JSON.parse(getDataFromStorage("userData", "local")).userId;
    formData.append("userId", userId);
    formData.append("title", name);
    formData.append("content", description);
    formData.append("file", photo);

    api({
      url: "http://localhost:8008/api/create_articles",
      method: "POST",
      data: formData,
    })
      .then(() => {
        navigate("/Articles");
      })
      .catch((error) => {
        setError("There was an error creating the article!error");
        console.error("There was an error creating the article!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReturn = () => {
    navigate("/Articles");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 3,
        width: "100%",
        maxWidth: "500px",
        mx: "auto",
      }}
    >
      <TextField
        label="Article Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2, width: "100%" }}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        sx={{ marginBottom: 2, width: "100%" }}
        required
      />
      <Button
        variant="contained"
        component="label"
        sx={{ marginBottom: 2, width: "100%" }}
      >
        Upload Photo
        <input type="file" hidden onChange={handlePhotoChange} />
      </Button>

      {photoPreview && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 2,
            width: "100%",
          }}
        >
          <img
            src={photoPreview}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "300px", marginBottom: 8 }}
          />
          <Typography variant="subtitle1">{photoName}</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2, width: "100%" }}>
          {error}
        </Alert>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
        sx={{ width: "100%" }}
      >
        {loading ? <CircularProgress size={24} /> : "Create Article"}
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleReturn}>
        بازگشت
      </Button>
    </Box>
  );
}
