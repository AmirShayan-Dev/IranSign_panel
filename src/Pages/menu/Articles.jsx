import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { api } from "../../apiInstance/api";

export default function Articles() {
  const drawerWidth = 250;
  const navigate = useNavigate();
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    api({
      url: "http://localhost:8008/api/articles",
      method: "GET",
    })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setArticles(response.data.data);
        } else {
          console.error("Unexpected response data format:", response.data);
          setArticles([]);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the articles!", error);
        setArticles([]);
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
          marginRight: `${drawerWidth}px`,
          textAlign: "right",
          width: `calc(100% - ${drawerWidth}px)`,
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
          }}
        >
          ایجاد مقاله جدید
        </Button>

        <Grid container spacing={2} sx={{ marginTop: "80px" }}>
          {articles.length > 0 ? (
            articles.map((article) => (
              <Grid item xs={12} key={article.id}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    padding: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    gap: 2,
                    width: "96%",
                    backgroundColor: "#f9f9f9", 
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {article.url && (
                      <img
                        src={article.url}
                        alt={article.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    <div>
                      <h2 style={{ margin: 0 }}>{article.title}</h2>
                      <p style={{ margin: "0.5rem 0", color: "#333" }}>
                        {article.content && article.content.length > 100
                          ? `${article.content.substring(0, 100)}...`
                          : article.content}
                      </p>
                    </div>
                  </Box>
                  <Box sx={{ whiteSpace: "nowrap" }}>
                    <IconButton
                      onClick={() => handleEdit(article.id)}
                      sx={{ marginRight: 1, color: "grey" }} 
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(article.id)}
                      sx={{ color: "grey" }} 
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
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
