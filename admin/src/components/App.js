import React from 'react';
import {Route, Router} from "react-router-dom";
import Header from "./Header";
import PostList from "./posts/postList/PostList";
import PostEdit from "./posts/PostEdit";
import customHistory from "../customHistory";
import PostCreate from "./posts/PostCreate";


function App() {
  return <div className="ui container">
    <Router history={customHistory} >
      <div>
        <Header path="/" />
        <Route path="/" exact component={PostList} />
        <Route path="/posts/edit/:slug" component={PostEdit}/>
        <Route path="/posts/create" component={PostCreate}/>
      </div>
    </Router>
  </div>;
}

export default App;
