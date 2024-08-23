import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { api } from "../../apiInstance/api.jsx";

export default function Dashboard() {
  const drawerWidth = 250;
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);

  const navigate = useNavigate();

  const goToCategory = () => navigate("/Category");
  const goToProducts = () => navigate("/Products");
  const goToArticles = () => navigate("/Articles");
  const goToUsers = () => navigate("/Users");

  const menuItems = [
    { text: "داشبورد" },
    { text: "دسته بندی ها", action: goToCategory },
    { text: "محصولات", action: goToProducts },
    { text: "مقالات", action: goToArticles },
    { text: "کاربران", action: goToUsers },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching the quantity of users
        const userResponse = await api({
          url: "http://localhost:8008/api/users",
        });
        setUserCount(userResponse.data.data.length);

        // Fetching the quantity of products
        const productResponse = await api({
          url: "http://localhost:8008/api/products",
        });
        setProductCount(productResponse.data.data.length);

        // Fetching the quantity of articles
        const articleResponse = await api({
          url: "http://localhost:8008/api/articles",
        });
        setArticleCount(articleResponse.data.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
        <h1 style={{ fontSize: "1.3rem" }}>خوش آمدید</h1>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mt: 4,
          }}
        >
          <Card sx={{ minWidth: 200, textAlign: "center" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                کاربران
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {userCount}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 200, textAlign: "center" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                محصولات
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {productCount}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 200, textAlign: "center" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                مقالات
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {articleCount}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
