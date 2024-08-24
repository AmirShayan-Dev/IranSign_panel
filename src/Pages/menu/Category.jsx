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
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { api } from "../../apiInstance/api.jsx";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const drawerWidth = 250;
  const navigate = useNavigate();

  const refreshCategories = () => {
    api({
      url: "http://localhost:8008/api/category",
      method: "GET",
    })
      .then((response) => {
        console.log("Categories fetched:", response.data);
        if (Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setCategories([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  const handleDeleteCategory = (id) => {
    api({
      url: `http://localhost:8008/api/delete-category/${id}`,
      method: "DELETE",
    })
      .then(() => {
        refreshCategories();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleEditCategory = (id) => {
    navigate(`/update-category/${id}`);
  };

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

        <Button
          variant="contained"
          color="primary"
          onClick={goToCreateCategory}
          sx={{ mb: 2 }}
        >
          ایجاد دسته بندی جدید
        </Button>

        <List>
          {categories.length > 0 ? (
            categories.map((category) => (
              <ListItem
                key={category.id}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditCategory(category.id)}
                      sx={{ marginLeft: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No categories available" />
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
}
