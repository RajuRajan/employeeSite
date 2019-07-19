import React from 'react';
import {NavLink}from 'react-router-dom';



class Indexx extends React.Component{
render(){
    return(    
          <header>
               <div className="cm"><img src="cm.png" alt="cm"/></div>
              <div className="main">
                 
                 <ul>
                     <li className="active"><NavLink to="/login"><button type="button" className="btn btn-outline-success">Login</button></NavLink></li>
                     <li><NavLink to="/signup"><button type="button" className="btn btn-outline-success">signup</button></NavLink></li>
                 </ul>
              </div>
              <div className="tittle">
                 <h1> WELCOME TO CODINGMART SITE</h1>
              </div>
              </header>  

    )
}
}
export default Indexx;