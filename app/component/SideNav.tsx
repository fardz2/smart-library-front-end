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
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "../stores/authStore";
import { toast } from "react-toastify";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
  Input,
  Spinner,
} from "@nextui-org/react";
import { ChevronDownIcon, Menu, Search } from "lucide-react";
// import useinfoUserStore from "../stores/userInfoStore";
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
  const [isLoading, setLoading] = useState<boolean>(false);

  const { token, setToken, clearToken, setInfoUser, infoUser, resetInfoUser } =
    useAuthStore();
  // const { infoUser, setinfoUser, resetinfoUser } = useinfoUserStore();
  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   setToken(localStorage.getItem("token"));
    //   getinfoUser();
    // }
    getinfoUser();
  }, [token]);

  const getinfoUser = async () => {
    try {
      if (token != null) {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get("http://127.0.0.1:8000/api/info", {
          headers,
        });
        if (response.status == 200) {
          setInfoUser({
            name: response.data.data.name,
            email: response.data.data.email,
            role: response.data.data.role_id,
          });
        }
        setLoading(false);
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
        resetInfoUser();
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
        router.replace("/");
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
        {infoUser?.role == 1 ? (
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
        {infoUser?.role == 1 || infoUser?.role == 2 ? (
          <Link href={"/manage-buku"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={"Manage buku"} />
              </ListItemButton>
            </ListItem>
          </Link>
        ) : (
          ""
        )}
        {infoUser?.role == 3 ? (
          <Link href={"/my-shelf"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={"my shelf"} />
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

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>
  ) : (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ bgcolor: "white" }}>
          <div className="flex justify-between w-full items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Menu color="#000000" />
            </IconButton>
            <div className="p-2">
              <Input
                type="text"
                placeholder="Enter your search"
                startContent={<Search color="#000000" />}
                className="h-98"
              />
            </div>
            <div>
              {token != null ? (
                <Dropdown>
                  <DropdownTrigger>
                    <Button radius="full" className="pl-1 py-6 bg-white">
                      <Avatar
                        isBordered
                        color="default"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      />
                      <p>{infoUser?.name}</p>
                      <ChevronDownIcon />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                      key="new"
                      onClick={() => router.push("/profile/")}
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <div>
                  <Button
                    className="rounded-full bg-[#3DA5B4] text-white"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="rounded-full bg-[#B6B6B6] text-white"
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
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
