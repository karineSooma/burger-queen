import React from 'react';
import './App.css';
import Home from './pages/Home';
import Hall from './pages/Hall';
import "./App.css";
import CreateAccount from "./pages/CreateAccount";
import Kitchen from "./pages/Kitchen";
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";


function App() {
  return (
    <Router>
        <div className="App">
          <header className="App-header">
            <Route path='/'exact component={Home} />
            <Route path='/create-account' component={CreateAccount} />
            <Route path='/salao' component={Hall} />
            <Route path='/cozinha' component={Kitchen} />
          </header>
        </div>
      </Router>
    )
  }

export default App;
