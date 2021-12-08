import React from "react";
import Home from "../screens/home/Home";
//import LoginModal from '../common/login/LoginModal';
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";

const Controller = () => {
  const baseUrl = "/api/v1/";

  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path="/"
          render={({history},props) => <Home history={history} {...props} baseUrl={baseUrl} />}
        />
          {/*<Route
              exact
              path="/login"
              render={(props) => <LoginModal {...props} baseUrl={baseUrl} />}
          />*/}
         <Route
          path="/movie/:id"
          render={(props) => <Details {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/bookshow/:id"
          render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/confirm/:id"
          render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
        />
      </div>
    </Router>
  );
};

export default Controller;
