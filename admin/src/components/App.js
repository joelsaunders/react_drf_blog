import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./Header";
import PostList from "./posts/PostList";
import PostEdit from "./posts/postEdit/PostEdit";


function App() {
  return <div className="ui container">
    <BrowserRouter >
      <div>
        <Header path="/" />
        <Route path="/" exact component={PostList} />
        <Route path="/posts/edit/:slug" component={PostEdit}/>
      </div>
    </BrowserRouter>
  </div>;
}

export default App;
