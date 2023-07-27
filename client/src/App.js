import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Lfg from "./pages/Lfg";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";
import Search from "./pages/Search";

function App() {
  const socket = io("http://localhost:8080");
  const socketRef = useRef();
  const [chatAlert, setChatAlert] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    socketRef.current = socket;

    // Register the current user's socket on connect
    if (user) {
      socketRef.current.emit("register", user._id);
    }

    socketRef.current.on("chatAlert", () => {
      // Handle notifications
      console.log("Chat alert received");
      setChatAlert(true);
    });

    return () => {
      socketRef.current.off("chatAlert");
    };
  }, []);

  return (
    <>
      <Router>
        <div className="container">
          <Header chatAlert={chatAlert} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify/:id" element={<Verify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/lfg" element={<Lfg />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route
              path="/chat"
              element={
                <Chat
                  chatAlert={chatAlert}
                  setChatAlert={setChatAlert}
                  socketRef={socketRef}
                />
              }
            />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
