import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

export default function Articles() {
  const drawerWidth = 250;

  const navigate = useNavigate();

  const goToCategory = () => {
    navigate("/Category");
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

  const menuItems = [
    { text: "داشبورد", action: goToDashboard },
    { text: "دسته بندی ها", action: goToCategory },
    { text: "محصولات", action: goToProducts },
    { text: "مقالات", action: goToArticles },
    { text: "کاربران" },
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
        <h1 style={{ fontSize: "1rem" }}>کاربران </h1>{" "}
      </Box>
    </Box>
  );
}
