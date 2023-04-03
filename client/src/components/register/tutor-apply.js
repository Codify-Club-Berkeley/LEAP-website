import React, { Component } from "react";
import SimpleReactValidator from 'simple-react-validator';
import AuthService from "../../services/auth-service";
import Select from 'react-dropdown-select';

export default class TutorApplication extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submitForm = this.submitForm.bind(this); 

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "", 
      subjects: [] 
    };
    
  }
  options = [{value: 1, label: "AP Biology"}, {value: 2, label: "AP Chemistry"}, {value: 3, label: "AP Physics 1"}, {value: 3, label: "AP Physics 2"}]

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  submitForm(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    if (this.validator.allValid()) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    } else {
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
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Username *</label>
        <input className="form-control" value={this.state.username} onChange={this.onChangeUsername} />

        {/**********   This is where the magic happens     ***********/}
        {this.validator.message('username', this.state.username, 'required|min:3|max:20', { className: 'text-danger' })}

      </div>
      <div className="form-group">
        <label>Email *</label>
        <input className="form-control" value={this.state.email} onChange={this.onChangeEmail} />

        {/**********   This is where the magic happens     ***********/}
        {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}

      </div>
      <div className="form-group">
        <label>Password *</label>
        <input className="form-control" value={this.state.password} onChange={this.onChangePassword} />

        {/**********   This is where the magic happens     ***********/}
        {this.validator.message('password', this.state.password, 'required|min:6|max:40', { className: 'text-danger' })}
      </div>
      <div className="form-group">
        <label>Subjects You Can Tutor *</label>
        <Select multi={true} options={this.options} onChange={(values) => this.setState({subjects: values})}></Select>
      </div>
      <button className="btn btn-primary" onClick={this.submitForm}>Sign Up</button>
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
        )
  }
}