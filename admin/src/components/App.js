import React from 'react';
import {Route, Router} from "react-router-dom";
import PostList from "./posts/postList/PostList";
import PostEdit from "./posts/postEdit/PostEditContainer";
import customHistory from "../customHistory";
import PostCreate from "./posts/postCreate/PostCreateContainer";
import HeaderContainer from "./header/HeaderContainer";
import AboutContainer from "./about/AboutContainer";
import SiteContainer from "./site/SiteContainer";
import ContactContainer from "./contact/ContactContainer";
import TeamContainer from "./team/TeamContainer";
import PostDetailContainer from "./posts/postDetail/PostDetailContainer";


function App() {
  return <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-2 max-w-6xl">
      <Router history={customHistory} >
        <div>
          <Route path="/" component={HeaderContainer} />
          <Route path="/" exact component={PostList} />
          <Route path="/posts/edit/:slug" component={PostEdit}/>
          <Route path="/posts/create" component={PostCreate}/>
          <Route path="/about" component={AboutContainer}/>
          <Route path="/site" component={SiteContainer}/>
          <Route path="/contact" component={ContactContainer}/>
          <Route path="/team" component={TeamContainer}/>
          <Route path="/posts/:slug" exact component={PostDetailContainer}/>
        </div>
      </Router>
    </div>
  </div>;
}

export default App;
