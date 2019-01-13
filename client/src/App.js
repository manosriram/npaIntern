import React, { Component } from 'react';
import {Route,Redirect,BrowserRouter} from 'react-router-dom';
import './App.css';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hey there from App!</h1>
      <BrowserRouter>
      <div>
        <Route path="/" component={Register}/>
        <Redirect to="/" component={Register}/>
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
