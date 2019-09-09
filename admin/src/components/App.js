import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./Header";
import PostList from "./posts/PostList";

function App() {
  return <div className="ui container">
    <BrowserRouter >
      <div>
        <Header path="/" />
        <Route path="/" exact component={PostList} />
      </div>
    </BrowserRouter>
  </div>;
}

export default App;
