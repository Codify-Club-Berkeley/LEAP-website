import React, { Component } from "react";

import UserService from "../services/user-service";
import SideNavBar from "./SideNavBar";

export default class BoardStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getStudentBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const sidebarNavItems = [
      {
          display: 'Dashboard',
          icon: <i className='bx bx-home'></i>,
          to: '/user',
          section: 'user'
      },
      {
          display: 'Students',
          icon: <i className='bx bx-group'></i>,
          to: '/students',
          section: 'students'
      },
      {
          display: 'Calendar',
          icon: <i className='bx bx-calendar'></i>,
          to: '/calendar',
          section: 'calendar'
      },
      {
          display: 'Messages',
          icon: <i className='bx bx-message-alt-detail'></i>,
          to: '/messaging',
          section: 'messaging'
      },
      {
          display: 'Settings',
          icon: <i className='bx bx-cog'></i>,
          to: '/settings',
          section: 'settings'
      },
  ]
    return (
      <div className="container">
        <SideNavBar props={sidebarNavItems}></SideNavBar>
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}