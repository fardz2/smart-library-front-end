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
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
// import useAuthStore from "../stores/authStore";
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
import {
  Book,
  BookCopy,
  ChevronDownIcon,
  Home,
  Menu,
  Search,
  User,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

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
  const { data: session, status }: { data: any; status: string } = useSession();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const pathName = usePathname()

  const drawer = (
    <div>
      <Toolbar />

      <List>
        <Link href={"/"} className={`${pathName === "/" ? "bg-blue-300" : ""}`}>
          <ListItem disablePadding>
            <ListItemButton>
              <div className={`flex justify-center items-center px-4 gap-3 `}>
                <Home strokeWidth={1.25} />
                <ListItemText primary={"Home"} />
              </div>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href={"/search"} className={` ${pathName === "/search" ? "bg-blue-300" : ""}`}>
          <ListItem disablePadding>
            <ListItemButton>
              <div className="flex justify-center items-center px-4 gap-3">
                <Search strokeWidth={1.25} />
                <ListItemText primary={"Search"} />
              </div>
            </ListItemButton>
          </ListItem>
        </Link>
        {session?.user.role == "admin" ? (
          <Link href={"/user"}>
            <ListItem disablePadding>
              <ListItemButton>
                <div className="flex justify-center items-center px-4 gap-3">
                  <User strokeWidth={1.25} />
                  <ListItemText primary={"User"} />
                </div>
              </ListItemButton>
            </ListItem>
          </Link>
        ) : (
          ""
        )}
        {session?.user.role == "admin" || session?.user.role == "pustakawan" ? (
          <>
            <Link href={"/manage-buku"}>
              <ListItem disablePadding>
                <ListItemButton>
                  <div className="flex justify-center items-center px-4 gap-3">
                    <Book strokeWidth={1.25} />
                    <ListItemText primary={"Manage Buku"} />
                  </div>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href={"/peminjaman"}>
              <ListItem disablePadding>
                <ListItemButton>
                  <div className="flex justify-center items-center px-4 gap-3">
                    <Book strokeWidth={1.25} />
                    <ListItemText primary={"Peminjaman"} />
                  </div>
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        ) : (
          ""
        )}
        {session?.user.role == "pengunjung" ? (
          <Link href={"/my-shelf"}>
            <ListItem disablePadding>
              <ListItemButton>
                <div className="flex justify-center items-center px-4 gap-3">
                  <BookCopy strokeWidth={1.25} />
                  <ListItemText primary={"My Shelf"} />
                </div>
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
          <div className="flex justify-end w-full items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Menu color="#000000" />
            </IconButton>

            <div>
              {status == "authenticated" ? (
                <Dropdown>
                  <DropdownTrigger>
                    <Button radius="full" className="pl-1 py-6 bg-white">
                      <Avatar
                        isBordered
                        color="default"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      />
                      <p>{session?.user.name}</p>
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
                      onClick={() => {
                        signOut({
                          redirect: false,
                        });
                        router.replace("/");
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
                      }}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <div className="flex flex-row gap-3">
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
        className="bg-[#54E6FA]"
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
