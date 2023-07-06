<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da249f7 (complete full stack post creation)
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

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lfg" element={<Lfg />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
=======
import logo from './logo.svg';
import './App.css';
import Post from './post.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Post/>
      </header>
    </div>
>>>>>>> 40f19cd (init working post skeleton)
=======
import Post from "./pages/Post";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Post />} />

            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
>>>>>>> da249f7 (complete full stack post creation)
  );
}

export default App;
