import React, { Component } from 'react';
import './App.css';
import Contact from './components/Contact';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header branding="Contact Manager" />
        <Contact name="Carlos" email="algodon@gmail.com" phone="3052216632" />
      </div>
    );
  }
}

export default App;
