import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { api } from "../../apiInstance/api.jsx";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const drawerWidth = 250;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const refreshUsers = () => {
    api({
      url: "http://localhost:8008/api/users",
      method: "GET",
    })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error("Unexpected response data format:", response.data);
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const handleDeleteUser = (id) => {
    api({
      url: `http://localhost:8008/api/users/${id}`,
      method: "DELETE",
    })
      .then(() => {
        refreshUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEditUser = (id) => {
    navigate(`/EditUser/${id}`);
  };

  const goToCreateUser = () => {
    navigate("/CreateUser");
  };

  const menuItems = [
    { text: "داشبورد", action: () => navigate("/Dashboard") },
    { text: "دسته بندی ها", action: () => navigate("/Category") },
    { text: "محصولات", action: () => navigate("/Products") },
    { text: "مقالات", action: () => navigate("/Articles") },
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
          onClick={goToCreateUser}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
          }}
        >
          ایجاد کاربر جدید
        </Button>

        <Grid container spacing={2} sx={{ marginTop: "80px" }}>
          {users.length > 0 ? (
            users.map((user) => (
              <Grid item xs={12} key={user.id}>
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
                    <div>
                      <h2 style={{ margin: 0 }}>{user.name}</h2>
                      <p style={{ margin: "0.5rem 0", color: "#333" }}>
                        {user.email}
                      </p>
                    </div>
                  </Box>
                  <Box sx={{ whiteSpace: "nowrap" }}>
                    <IconButton
                      onClick={() => handleEditUser(user.id)}
                      sx={{ marginRight: 1, color: "grey" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteUser(user.id)}
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
                <p>No users available</p>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
