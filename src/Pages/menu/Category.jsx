import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const drawerWidth = 250;
  const navigate = useNavigate();

  // Fetch categories from the API
  const refreshCategories = () => {
    axios
      .get("http://localhost:8008/api/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  // Fetch categories when component mounts
  useEffect(() => {
    refreshCategories();
  }, []);

  // Delete a category
  const handleDeleteCategory = (id) => {
    axios
      .delete(`http://localhost:8008/api/delete-category/${id}`)
      .then(() => {
        refreshCategories(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  // Navigate to the CreateCategory page
  const goToCreateCategory = () => {
    navigate("/CreateCategory");
  };
  const goToDashboard = () => {
    navigate("/Dashboard");
  };
  const goToProducts = () => {
    navigate("/Products");
  };
  const goToArticles = () => {
    navigate("/Articles");
  };
  const goToUsers = () => {
    navigate("/Users");
  };

  const menuItems = [
    { text: "داشبورد", action: goToDashboard },
    { text: "دسته بندی ها" },
    { text: "محصولات", action: goToProducts },
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
          {/* <List>
            <ListItemButton onClick={() => navigate("/Dashboard")}>
              <ListItemText primary="داشبورد" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="دسته بندی ها" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/Products")}>
              <ListItemText primary="محصولات" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/Articles")}>
              <ListItemText primary="مقالات" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/Users")}>
              <ListItemText primary="کاربران" />
            </ListItemButton>
          </List> */}
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          p: 1,
          marginRight: 35,
          textAlign: "right",
        }}
      >
        <h1 style={{ fontSize: "1.2rem" }}>لیست دسته بندی ها</h1>

        {/* Create New Category Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={goToCreateCategory}
          sx={{ mb: 2 }}
        >
          ایجاد دسته بندی جدید
        </Button>

        {/* List of Categories */}
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
