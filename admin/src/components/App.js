import React from 'react';
import {Route, Router} from "react-router-dom";
import Header from "./Header";
import PostList from "./posts/postList/PostList";
import PostEdit from "./posts/postEdit/PostEdit";
import customHistory from "../customHistory";


function App() {
  return <div className="ui container">
    <Router history={customHistory} >
      <div>
        <Header path="/" />
        <Route path="/" exact component={PostList} />
        <Route path="/posts/edit/:slug" component={PostEdit}/>
      </div>
    </Router>
  </div>;
}

export default App;
