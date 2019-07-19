import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router ,Route}from 'react-router-dom';
import Indexx from './Indexx';
import Signup from './Signup';
import Login from './Login';
import Employeehome from './Employeehome';
import Hrhome from './Hrhome';
import Adminhome from './Adminhome';


class App extends Component {
  render() {
    return (
    
      <Router>
        <Route exact path= "/" render = {() => <Indexx/>} />
        <Route exact path="/login" render={() =>  <Login/> } />
        <Route exact path="/signup" render={()=><Signup/>}/>
       
        <Route exact path="/home" render={() => <Employeehome/>} />
        <Route exact path="/hrhome" render={() => <Hrhome/>} />
        <Route exact path="/adminhome" render={() => <Adminhome/>} />
  
        {/* <Route exact path="/employee" render={() => <Employee/>} />
        <Route exact path="/register" render={() => <Register/>} />
        <Route exact path="/notification" render={() => <Notification/>} /> */}
     

    </Router>
   
    )
}
}

export  default App;
