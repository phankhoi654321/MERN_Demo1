import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";


import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./App.css";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          {/* must be use Router or BrowserRoute for wrap the element use with route */}
          <div className="App">
            <Navbar />
            {/* If the main page also use another path for another component like / for login you must use exact key word for implement Landing */}
            {/* https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf */}

            <Route exact path="/" component={Landing} />

            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
