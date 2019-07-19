import React, { Component } from 'react';
import Layout from './components/Layout.js';
import './styles/App.css';
import Routes from "./Routes";



class App extends Component {
  render() {
    return (  
    <Routes>
      <Layout />
    </Routes>
    );
  }
}

export default App;
