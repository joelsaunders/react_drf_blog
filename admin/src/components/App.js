import React from 'react';
import {Route, Router} from "react-router-dom";
import PostList from "./posts/postList/PostList";
import PostEdit from "./posts/PostEdit";
import customHistory from "../customHistory";
import PostCreate from "./posts/PostCreate";
import HeaderContainer from "./header/HeaderContainer";
import AboutContainer from "./about/AboutContainer";
import SiteContainer from "./site/SiteContainer";
import ContactContainer from "./contact/ContactContainer";
import TeamContainer from "./team/TeamContainer";


function App() {
  return <div className="bg-gray-100">
      <div className="container mx-auto p-2">
      <Router history={customHistory} >
        <div>
          <HeaderContainer path="/" />
          <Route path="/" exact component={PostList} />
          <Route path="/posts/edit/:slug" component={PostEdit}/>
          <Route path="/posts/create" component={PostCreate}/>
          <Route path="/about" component={AboutContainer}/>
          <Route path="/site" component={SiteContainer}/>
          <Route path="/contact" component={ContactContainer}/>
          <Route path="/team" component={TeamContainer}/>
        </div>
      </Router>
    </div>
  </div>;
}

export default App;
