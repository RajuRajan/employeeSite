import React from 'react';
import {BrowserRouter as Router,Link,Route, Switch,Redirect} from 'react-router-dom';
import Register from './Register';
import Notification from './Notification';
import * as jwt_decode from 'jwt-decode';
import Employee from './Employee';

class Adminhome extends React.Component{
  constructor(){
    super();
    this.state={
        crypt:null,
      
    }
}


  componentWillMount(){
    var token=localStorage.getItem('token');
    this.setState({crypt:jwt_decode(token).accounttype });
  
}

render(){
  if(this.state.crypt !=="admin" || this.state.crypt==null)
            {
                console.log("crypt");
                return( 
              
                <Redirect to="/" />
                )
            }
   
    return(
        
        <header>  
          <Link to="/"><button type="button" id="logout" className="btn btn-outline-success" >logout</button>  </Link>
          <Router>   
      
              <div className="sidenav fontnav">
              <div className="cm"><img src="cm.png" alt="cm"/></div>
              <Link to="/adminhome/employee">Employee's</Link>
                <Link to="/adminhome/register">Registration</Link>
              <Link to="/adminhome/notification"> Notifications</Link> 
              {/* <Link to="/"> logout</Link>  */}
             
        </div>
        
        <Switch>
           {/* <Route exact  path="/" render={()=><Indexx/>}/> */}
          <Route exact path="/adminhome/employee" render={() => <Employee/>} />
          <Route exact path="/adminhome/register" render={() => <Register/>} />
          <Route exact path="/adminhome/notification" render={() => <Notification/>} />
        
          
        </Switch>
          
      </Router>

      </header>

    )
}


}

export default Adminhome;