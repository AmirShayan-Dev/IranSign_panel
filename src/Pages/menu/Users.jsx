import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { api } from "../../apiInstance/api";

export default function Users() {
  const drawerWidth = 250;
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api({
        url: "http://localhost:8008/api/users",
        method: "GET",
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const createUser = async () => {
    try {
      await api({
        method: "POST",
        url: "http://localhost:8008/api/users/register",
        data: newUser,
      });
      fetchUsers();
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUser = async () => {
    try {
      await api({
        url: `http://localhost:8008/api/users/${selectedUser.id}`,
        data: selectedUser,
        method: "PUT",
      });
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setNewUser({ name: user.name, email: user.email });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

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
        <h1>کاربران</h1>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={selectedUser ? selectedUser.name : newUser.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={selectedUser ? selectedUser.email : newUser.email}
            onChange={handleInputChange}
            fullWidth
          />
          {selectedUser ? (
            <Button variant="contained" onClick={updateUser} color="primary">
              Update User
            </Button>
          ) : (
            <Button variant="contained" onClick={createUser} color="primary">
              Create User
            </Button>
          )}
        </Box>
        <h2>List of Users</h2>
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              button
              onClick={() => handleUserSelect(user)}
            >
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
