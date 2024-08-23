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
import { useNavigate } from "react-router-dom";
import { api } from "../../apiInstance/api.jsx"; // Import the apiInstance

export default function Products() {
  const drawerWidth = 250;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the API
    api({
      url: "http://localhost:8008/api/products",
      method: "GET",
    })
      .then((response) => {
        console.log("Products fetched:", response.data); // Log the response data
        // Check if the response data is an array
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error("Unexpected response data format:", response.data);
          setProducts([]); // Reset to an empty array if data format is not as expected
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]); // Reset to an empty array in case of error
      });
  }, []);

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
            {menuItems.map((item, index) => (
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
          marginRight: drawerWidth,
          textAlign: "right",
        }}
      >
        <h1 style={{ fontSize: "1rem" }}>محصولات</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={goToCreateProduct}
          sx={{ marginBottom: 2 }}
        >
          ایجاد محصول جدید
        </Button>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {Array.isArray(products) ? (
            products.map((product, index) => (
              <Card key={index} sx={{ maxWidth: 200 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.url}
                  alt={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category.name}
                  </Typography>
                </CardContent>
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
