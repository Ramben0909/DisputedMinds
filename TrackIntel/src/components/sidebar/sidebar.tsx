import { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FiActivity, FiMessageSquare, FiBarChart2, FiLogOut, FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar open/close

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box
      sx={{
        width: isSidebarOpen ? 250 : 64, // Width changes based on state
        height: "100vh",
        bgcolor: "rgb(17,29,39)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: 2,
        gap: 2,
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        transition: "width 0.3s ease", // Smooth transition for width change
        position: "relative", // Required for positioning the toggle button
      }}
    >
      {/* Toggle Button */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: "absolute",
          top: 16,
          right: isSidebarOpen ? 16 : 2, // Adjust position based on sidebar state
          bgcolor: "rgb(17,29,39)",
          color: "white",
          border: "1px solid #374151",
          zIndex: 1, // Ensure the button is above other elements
          "&:hover": {
            bgcolor: "rgb(25, 39, 52)",
          },
        }}
      >
        <FiMenu /> {/* Hamburger icon */}
      </IconButton>

      {/* Sidebar Header */}
      {isSidebarOpen && (
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
          F1 History AI
        </Typography>
      )}

      {/* Navigation Buttons with Icons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: isSidebarOpen ? 0 : 6, // Add margin-top when sidebar is closed
        }}
      >
        <Button
          onClick={() => navigate("/about")}
          sx={{
            color: "white",
            justifyContent: isSidebarOpen ? "flex-start" : "center",
            gap: 2,
            "&:hover": {
              bgcolor: "rgb(25, 39, 52)", // Hover effect
            },
          }}
        >
          <FiActivity className="w-5 h-5 text-red-500" />
          {isSidebarOpen && <span>About</span>}
        </Button>
        <Button
          onClick={() => navigate("/chat")}
          sx={{
            color: "white",
            justifyContent: isSidebarOpen ? "flex-start" : "center",
            gap: 2,
            "&:hover": {
              bgcolor: "rgb(25, 39, 52)", // Hover effect
            },
          }}
        >
          <FiMessageSquare className="w-5 h-5 text-red-500" />
          {isSidebarOpen && <span>Chat</span>}
        </Button>
        <Button
          onClick={() => navigate("/services")}
          sx={{
            color: "white",
            justifyContent: isSidebarOpen ? "flex-start" : "center",
            gap: 2,
            "&:hover": {
              bgcolor: "rgb(25, 39, 52)", // Hover effect
            },
          }}
        >
          <FiBarChart2 className="w-5 h-5 text-red-500" />
          {isSidebarOpen && <span>Services</span>}
        </Button>

        {/* Logout Button */}
        <Button
          onClick={() => navigate("/")}
          sx={{
            color: "white",
            justifyContent: isSidebarOpen ? "flex-start" : "center",
            gap: 2,
            "&:hover": {
              bgcolor: "rgb(25, 39, 52)", // Hover effect
            },
          }}
        >
          <FiLogOut className="w-5 h-5 text-red-500" />
          {isSidebarOpen && <span>Logout</span>}
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;