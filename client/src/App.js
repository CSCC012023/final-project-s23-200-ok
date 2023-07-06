import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
//import Profile from "./pages/MyProfile";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
<<<<<<< HEAD
import Lfg from "./pages/Lfg.jsx";
import Post from "./pages/Post"
=======
import Post from "./pages/Post";
>>>>>>> da249f7a5bc0f32188460642de7abc67c136381c

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lfg" element={<Lfg />} />
            <Route path="/post" element={<Post />} />

=======
            <Route path="/" element={<Post />} />

            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
>>>>>>> da249f7a5bc0f32188460642de7abc67c136381c
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
