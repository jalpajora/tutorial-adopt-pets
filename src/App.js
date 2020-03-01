import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";

import store from "./store";
import SearchParam from "./SearchParam";
import Details from "./Details";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <SearchParam path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </Provider>
  );
};

render(<App />, document.getElementById("root"));
