import React from 'react';
import './App.css';
import Navigation from "./components/navigation/navigation";
import {Route, Switch} from "react-router";
import Container from "@material-ui/core/Container";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Profile from "./components/Profile/Profile";
import ProfileEdit from "./components/ProfileEdit/ProfileEdit";
import AddPost from "./components/AddPost/AddPost";
import Posts from "./components/Posts/Posts";
import Subscriptions from "./components/Subscriptions/Subscriptions";

function App() {
  return (
    <div>
      <Navigation/>
      <Container>
        <Switch>
          <Route path='/' exact component={Posts}/>
          <Route path='/login' exact component={Login}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/profile' exact component={Profile}/>
          <Route path='/profile/edit' exact component={ProfileEdit}/>
          <Route path='/posts/new' exact component={AddPost}/>
          <Route path='/subscriptions' exact component={Subscriptions}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
