import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../context/useAuth";
import ChatItem from "../components/chat/Chatitem";
import { IoMdSend, IoMdMic } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/sidebar/sidebar';
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US"); // New state for selected language
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      // Set the language based on the selectedLanguage state
      recognitionRef.current.lang = selectedLanguage;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        toast.success("Listening...", { id: "mic" });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        toast.dismiss("mic");
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        toast.error(`Error: ${event.error}`);
      };

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        console.log("Transcript:", transcript);
        if (inputRef.current) {
          inputRef.current.value = transcript;
        }
      };
    } else {
      toast.error("Speech Recognition is not supported in this browser.");
    }
  }, [selectedLanguage]); // Re-run effect when the selected language changes

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang); // Update the selected language
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang;
      toast.success(`Language set to ${
        lang === "bn-IN"
          ? "Bengali"
          : lang === "hi-IN"
          ? "Hindi"
          : lang === "gu-IN"
          ? "Gujarati"
          : lang === "ta-IN"
          ? "Tamil"
          : lang === "te-IN"
          ? "Telugu"
          : "English"
      }`);
    }
    handleClose();
  };

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  // Function to handle key press events
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action (form submission, etc.)
      handleSubmit(); // Call the handleSubmit function
    }
  };

  return (
    <div className="container" style={{ height: "80vh", display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          width: "100vw", // Full viewport width
          height: "100vh", // Full viewport height
          mt: 3,
          overflow: "hidden", // Prevent overflow and scrollbars
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <Box
          sx={{
            display: "flex",
            flex: { md: 0.8, xs: 1, sm: 1 }, // Responsive design
            flexDirection: "column",
            px: 3,
            width: "100%", // Ensure full width for the chat box
          }}
        >
          {/* Chat Box */}
          <Box
            sx={{
              width: "100%",
              height: "74vh",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              bgcolor: "rgb(17,29,39)", // Chat background color
              overflowY: "auto", // Scroll vertically
              scrollBehavior: "smooth",
            }}
          >
            {chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}
          </Box>

          {/* Input Box */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "rgb(17,27,39)",
              display: "flex",
              alignItems: "center",
              mt: 2,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px",
                padding: "10px", // Add padding for better input experience
              }}
              onKeyDown={handleKeyPress}
            />
            <IconButton onClick={handleMicClick} sx={{ color: "white" }}>
              {isListening ? <IoMdMic color="red" /> : <IoMdMic />}
            </IconButton>
            <IconButton onClick={handleSubmit} sx={{ color: "white" }}>
              <IoMdSend />
            </IconButton>
          </Box>
        </Box>

        {/* Right panel for user info */}
        <Box
          sx={{
            display: { md: "flex", xs: "none", sm: "none" }, // Hide on smaller screens
            flex: 0.2, // Adjust flex ratio for the right panel
            flexDirection: "column",
            position: "relative",
            gap: 5,
            mr: 2,
            mb: 18,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "83%",
              height: "74vh",
              bgcolor: "rgb(17,29,39)",
              borderRadius: 3,
              mb: 5,
              mt: 0,
              flexDirection: "column",
              mx: "auto",
              p: 3,
              pb: 0,
              pt: 0, // Add padding for better layout
              alignItems: "center",
              justifyContent: "center", // Center content vertically
            }}
          >
            <Avatar
              sx={{
                bgcolor: "white",
                color: "black",
                fontWeight: 700,
                width: 56,
                height: 56,
                mb: 2,
              }}
            >
              {auth?.user?.name[0]}
              {auth?.user?.name.split(" ")[1][0]}
            </Avatar>
            <Typography sx={{ fontFamily: "Work Sans", textAlign: "center" }}>
              You are talking to F1Buddy
            </Typography>
            <Typography
              sx={{
                fontFamily: "Work Sans",
                textAlign: "center",
                mt: 2,
                mb: 4,
              }}
            >
              Your intelligent companion for exploring Formula 1's rich history. Get detailed insights about historic races, legendary drivers, and comprehensive statistics through our advanced AI chatbot.
            </Typography>
          </Box>
        </Box>

        {/* Language and Delete Chats Buttons */}
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteChats}
            sx={{
              textTransform: "none",
              fontFamily: "Work Sans",
              fontWeight: "bold",
            }}
          >
            Delete Chats
          </Button>
          <Button
            variant="contained"
            aria-controls={open ? "language-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {selectedLanguage === "bn-IN"
              ? "Bengali"
              : selectedLanguage === "hi-IN"
              ? "Hindi"
              : selectedLanguage === "gu-IN"
              ? "Gujarati"
              : selectedLanguage === "ta-IN"
              ? "Tamil"
              : selectedLanguage === "te-IN"
              ? "Telugu"
              : "English"}
          </Button>
        </Box>
      </Box>

      {/* Language Menu */}
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiMenu-paper": {
            bgcolor: "rgb(17,29,39)",
            color: "white",
            maxHeight: "200px",
            overflowY: "auto",
          },
        }}
      >
        <MenuItem onClick={() => handleLanguageChange("en-US")}>English</MenuItem>
        <MenuItem onClick={() => handleLanguageChange("bn-IN")}>Bengali</MenuItem>
        <MenuItem onClick={() => handleLanguageChange("hi-IN")}>Hindi</MenuItem>
        <MenuItem onClick={() => handleLanguageChange("gu-IN")}>Gujarati</MenuItem>
        <MenuItem onClick={() => handleLanguageChange("ta-IN")}>Tamil</MenuItem>
        <MenuItem onClick={() => handleLanguageChange("te-IN")}>Telugu</MenuItem>
      </Menu>
    </div>
  );
};

export default Chat;