import React from 'react';
import{Link,Redirect}from 'react-router-dom';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {         
            password : '',         
            userid:'',
            loginstatus: null,
            status:'false',
            name:null,
            empid:'',
            accounttype:'',
           
            }
        }
    
   login = () =>{
        if( this.state.userid !== '' && this.state.password !== ''){      
            var link = "http://localhost:8123/login/"+this.state.userid+"/"+this.state.password
            axios.post(link).then(res => {
                localStorage.setItem('token',res.data); 
              this.setState({name: jwt_decode(res.data).name,empid: jwt_decode(res.data).empid,accounttype: jwt_decode(res.data).accounttype})
            }
            )            
        }     
    }
    formHandler = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
   
    render(){
  console.log(this.state.name);
       
        if(this.state.name!== null)
        {
            if(this.state.accounttype==="employee")
            {
              
            return(
            
                <Redirect to="home"/>
            )
            }
            else if(this.state.accounttype==="hr")
            { 
                return(
                    <Redirect to="hrhome"/>
                ) 
            }
            else{
                return(
               
                    <Redirect to="adminhome"/>
                ) 
            }
        }
        
       
        return(
            <header>
             
                 <div className="cm"><img src="cm.png" alt="cm"/></div>
          <div className="container font center">
                <div className="row">
                   
                    <div className="col-xl-4"> </div>
                    
                    <div className="col-xl-4">            
                            <form >
                                <div className="form-group">
                                <label htmlFor="text">User Id:</label>
                                <input type="text" className="form-control" id="userid" placeholder="Enter email" name="userid"  onChange={this.formHandler.bind(this)} />
                                </div>
                        <div className="form-group">
                                <label htmlFor="pwd">Password:</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter password" name="password"  onChange={this.formHandler.bind(this)} />
                                </div>
                                  
                     <button type="button"  onClick={this.login.bind(this)}  className="btn btn-outline-success">Login</button>
                     
                            </form>
                            <Link to="/signup"><h5>Dont have an account?</h5></Link>
                    </div>
                    </div>
                    <div className="col-xl-5"> </div>
                    
                    </div>
         
          </header>
        )
        
    }
}
export default Login;