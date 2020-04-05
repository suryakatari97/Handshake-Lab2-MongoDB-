import React, { Component } from "react";
import Navbar from "./Navbar";


class Landing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4 text-danger">HandShake</h1>
                  <p className="lead text-warning">
                    The #1 way college students find jobs
                  </p>
                  <hr />
                  {/* <a href="/register" class="btn btn-lg btn-info mr-2">
                    Sign Up
                  </a> */}
                  <a href="/login" class="btn btn-lg btn-light">
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
