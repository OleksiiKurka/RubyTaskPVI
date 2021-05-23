
import React, { useContext} from 'react';
import './App.css';
import { DataContext } from './Context/DataContext';
import SignIn from "./components/Auth/Signin"
import UserPost from './components/Post/UserPost';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './components/Auth/Signup';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import Post from './components/Post/Post';



function App() {

  const { isAuthorized } = useContext(DataContext);


  return (
    <div >
      <BrowserRouter>
      <Navbar></Navbar>
        {!isAuthorized() ?
          <Switch>
            <Route path="/signup"> <SignUp /> </Route>
            <Route path="/signin"> <SignIn /> </Route>
            <Route path="/"> <HomePage /> </Route>
          </Switch>
          :
          <Switch>
            <Route path="/MyPost">  <UserPost/> </Route>
            <Route path="/Posts"><Post />  </Route>
            <Route path="/"> <HomePage /> </Route>
          </Switch>
        

        }
      </BrowserRouter>
    </div>
  );
}

export default App;
