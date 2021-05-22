import React, { useEffect } from "react";
import Search from "./components/Search";
import Profiles from "./components/Profiles";
import Commitlist from "./components/Commitlist";
import { useDispatch } from "react-redux";
import { getProfile } from "./actions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <Router>
      <div className="main-container">
        <h1 className="top-header">hello GitHub User</h1>
        <Switch>
          <Route path="/commit/:repname" component={Commitlist} />
          <Route
            paths="/"
            exact
            component={() => (
              <>
                <Search /> <Profiles />{" "}
              </>
            )}
          />
        </Switch>
        {/* <Commitlist /> */}
      </div>
    </Router>
  );
};

export default App;
