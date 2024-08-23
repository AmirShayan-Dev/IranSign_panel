import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { api } from "../../apiInstance/api";

export default function Articles() {
  const drawerWidth = 250;
  const navigate = useNavigate();
  const [articles, setArticles] = React.useState([]);

  // Fetch articles on component mount
  React.useEffect(() => {
    api({
      url: "http://localhost:8008/api/articles",
      method: "GET",
    })
      .then((response) => {
        console.log("Articles fetched:", response.data); // Log the response data
        // Check if the response data is an array
        if (Array.isArray(response.data.data)) {
          setArticles(response.data.data);
        } else {
          console.error("Unexpected response data format:", response.data);
          setArticles([]); // Reset to an empty array if data format is not as expected
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the articles!", error);
        setArticles([]); // Reset to an empty array in case of error
      });
  }, []);

  const handleDelete = (id) => {
    api({ method: "DELETE", url: `http://localhost:8008/api/article/${id}` })
      .then(() => {
        setArticles(articles.filter((article) => article.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the article!", error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/EditArticle/${id}`);
  };

  const handleCreate = () => {
    navigate("/CreateArticle");
  };

  const menuItems = [
    { text: "داشبورد", action: () => navigate("/Dashboard") },
    { text: "دسته بندی ها", action: () => navigate("/Category") },
    { text: "محصولات", action: () => navigate("/Products") },
    { text: "مقالات" },
    { text: "کاربران", action: () => navigate("/Users") },
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
          marginRight: drawerWidth,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ marginBottom: 2 }}
        >
          Make a New Article
        </Button>
        <Grid container spacing={2}>
          {Array.isArray(articles) && articles.length > 0 ? (
            articles.map((article) => (
              <Grid item xs={12} sm={6} md={4} key={article.id}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    padding: 2,
                    textAlign: "center",
                  }}
                >
                  <h2>{article.name}</h2>
                  <p>{article.description}</p>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(article.id)}
                    sx={{ marginRight: 1 }}
                  >
                    Change
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", padding: 2 }}>
                <p>No articles available</p>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
