import React, { Component } from "react";

import SimpleReactValidator from 'simple-react-validator';
import AuthService from "../services/auth-service";

import { withRouter } from "../common/with-router.js";


class Login extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    if (this.validator.allValid()) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className="container">
        <img
            src="../assets/logo.png"
            alt="profile-img"
            className="profile-img-card"
          />
      <h1>Log In</h1>
      <div className="form-group">
        <label>Username *</label>
        <input className="form-control" value={this.state.username} onChange={this.onChangeUsername} />

        {/**********   This is where the magic happens     ***********/}
        {this.validator.message('username', this.state.username, 'required|min:3|max:20', { className: 'text-danger' })}

      </div>
      <div className="form-group">
        <label>Password *</label>
        <input className="form-control" value={this.state.password} onChange={this.onChangePassword} />

        {/**********   This is where the magic happens     ***********/}
        {this.validator.message('password', this.state.password, 'required|min:6|max:40', { className: 'text-danger' })}
      </div>
      <button className="btn btn-primary" onClick={this.handleLogin}>Login</button>
      {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
    </div>
    );
  }
}

export default withRouter(Login);