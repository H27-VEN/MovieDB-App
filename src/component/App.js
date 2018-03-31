import React, { Component } from 'react';
import { NavLink, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import About from './About';
import Summary from './Summary';
import MovieGrid from './MovieGrid.js';


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App"> 
          <ul className="list-inline text-center">
              <li className="list-inline-item">
                  <NavLink to="/movies/popular/" activeClassName="selected" className="btn btn-prop btn-md" id="popular">Most Popular</NavLink>
              </li>
              <li className="list-inline-item">
                  <NavLink to="/movies/newest/"  activeClassName="selected" className="btn btn-prop btn-md" id="newest">Newest Release</NavLink>
              </li>
              <li className="list-inline-item">
                  <NavLink to="/about" activeClassName="selected" className="btn btn-prop btn-md" id="about">About</NavLink>
              </li>
          </ul>
          <Redirect from="*" to="/movies/popular" />
          <Route exact path="/movies/popular" component={MovieGrid}/>
          <Route exact path="/movies/newest" component={MovieGrid} />
          <Route exact path="/about" component={About}  />
          <Route exact path="*/summary/*" component={Summary} />    
      </div>
      </Router>
    );
  }
}

export default App;
