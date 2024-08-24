import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { api } from "../../apiInstance/api.jsx";

export default function Products() {
  const drawerWidth = 250;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api({
      url: "http://localhost:8008/api/products",
      method: "GET",
    })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error("Unexpected response data format:", response.data);
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, []);

  const handleDeleteProduct = (id) => {
    api({
      url: `http://localhost:8008/api/product/${id}`,
      method: "DELETE",
    })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const goToCategory = () => {
    navigate("/Category");
  };
  const goToDashboard = () => {
    navigate("/Dashboard");
  };
  const goToArticles = () => {
    navigate("/Articles");
  };
  const goToUsers = () => {
    navigate("/Users");
  };
  const goToCreateProduct = () => {
    navigate("/CreateProduct");
  };

  const menuItems = [
    { text: "داشبورد", action: goToDashboard },
    { text: "دسته بندی ها", action: goToCategory },
    { text: "محصولات" },
    { text: "مقالات", action: goToArticles },
    { text: "کاربران", action: goToUsers },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.action}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginRight: `${drawerWidth}px`,
          textAlign: "right",
          width: `calc(100% - ${drawerWidth}px)`,
          overflowX: "hidden",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>محصولات</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={goToCreateProduct}
          sx={{ marginBottom: 3 }}
        >
          ایجاد محصول جدید
        </Button>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          {Array.isArray(products) ? (
            products.map((product, index) => (
              <Card
                key={index}
                sx={{
                  width: "100%",
                  height: "400px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: "250px", objectFit: "cover" }}
                  image={product.url}
                  alt={product.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category.name}
                  </Typography>
                </CardContent>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                  }}
                  onClick={() => handleDeleteProduct(product.id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No products available</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
