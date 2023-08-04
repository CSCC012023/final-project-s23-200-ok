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
import ForgotPassword from "./pages/ForgotPassword";
import ViewProfile from "./pages/ViewProfile";
import Lfg from "./pages/Lfg";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";
import Search from "./pages/Search";
import GameStat from "./pages/GameStat";

import ResetPassword from "./pages/ResetPassword";
import { updateChatAlert } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const socket = io("http://localhost:8080");
  const socketRef = useRef();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    socketRef.current = socket;

    // Register the current user's socket on connect
    if (user) {
      socketRef.current.emit("register", user._id);
    }

    socketRef.current.on("chatAlert", () => {
      dispatch(updateChatAlert({ chatAlert: true, userId: user._id }));
    });

    return () => {
      socketRef.current.off("chatAlert");
    };
  }, [socketRef]);

  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword/:id" element={<ResetPassword />} />
            <Route path="/verify/:id" element={<Verify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:user_id" element={<ViewProfile />}/>
            <Route path="/lfg" element={<Lfg />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/chat" element={<Chat socketRef={socketRef} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/stat" element={<GameStat />} />

          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
