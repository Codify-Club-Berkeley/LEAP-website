import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth-service";

import Login from "./components/login-component";
import Register from "./components/register/register-component";
import Home from "./components/home-component";
import Profile from "./components/profile-component";
import BoardStudent from "./components/board-student-component";
import BoardTutor from "./components/board-tutor-component";
import BoardAdmin from "./components/board-admin-component";
import TutorApplication from "./components/register/tutor-apply";
import Messaging from "./pages/Messaging";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showTutorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showTutorBoard: user.roles.includes("ROLE_TUTOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showTutorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showTutorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Leap
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showTutorBoard && (
              <li className="nav-item">
                <Link to={"/tutor"} className="nav-link">
                  Tutor Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/apply"} className="nav-link">
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Tutors
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Admin
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/messaging" element={<Messaging />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/apply" element={<TutorApplication />}></Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardStudent />} />
            <Route path="/mod" element={<BoardTutor />} />
            <Route path="/admin" element={<BoardAdmin />} />
            
          </Routes>
          
        </div>
          
      </div>
    );
  }
}

export default App;