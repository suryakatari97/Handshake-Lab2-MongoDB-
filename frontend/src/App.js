import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter , Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/auth/HelperApis";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import { clearProfile } from "./actions/profileActions";
import { Provider } from "react-redux";

//check for token
if (localStorage.jwtToken && localStorage.jwtToken != "undefined") {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearProfile);
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
