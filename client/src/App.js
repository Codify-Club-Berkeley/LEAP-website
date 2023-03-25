import './styles/App.css';
import 'boxicons/css/boxicons.min.css';
import React from 'react';
import SideNavBar from './SideNavBar';
import Messaging from './pages/Messaging';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

class App extends React.Component {
    render () { 
        return (
        <>
            <SideNavBar></SideNavBar>
        </>
    ); 
    }; 
}

export default App; 