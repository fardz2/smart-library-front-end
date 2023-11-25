"use client";
import React, { ReactNode, useState, useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Link from "next/link";
import useAuthStore from "../stores/authStore";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: ReactNode;
  window?: () => Window;
}

export default function SideNav(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const { token, setToken, clearToken } = useAuthStore();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getInfoUser();
    }
  }, []);

  const getInfoUser = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get("http://127.0.0.1:8000/api/info", {
        headers,
      });
      if (response.status == 200) {
        setRole(response.data.data.role);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get("http://127.0.0.1:8000/api/logout", {
        headers,
      });
      if (response.status == 200) {
        localStorage.removeItem("token");
        setRole(null);
        clearToken();
        toast.success("Logout success", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Link href={"/"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href={"/search"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"Search"} />
            </ListItemButton>
          </ListItem>
        </Link>
        {role == "admin" ? (
          <Link href={"/user"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={"User"} />
              </ListItemButton>
            </ListItem>
          </Link>
        ) : (
          ""
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const router = useRouter();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },

          boxShadow: "none",
        }}
      >
        <Toolbar>
          <div className="flex justify-between w-full items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <div>
              <input type="text" />
            </div>
            <div>
              {token != null ? (
                <Button
                  variant="contained"
                  className="rounded-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <div>
                  <Button
                    variant="contained"
                    className="rounded-full"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    className="rounded-full"
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
