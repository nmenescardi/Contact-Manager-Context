import React, { Component } from 'react';
import Contact from './components/Contact';
import Header from './components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header branding="Contact Manager" />
        <div className="container">
          <Contact
            name="Carlos Smith"
            email="algodon@gmail.com"
            phone="3052216632"
          />
          <Contact
            name="Karen Busca Rueda"
            email="kbr@gmail.com"
            phone="3052216632"
          />
        </div>
      </div>
    );
  }
}

export default App;
