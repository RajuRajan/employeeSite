import React from 'react';

import axios from 'axios';
import {Link} from 'react-router-dom';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            account : '',
            name : '',
            empid : '',
            password : '',
            cpassword : '',
            userid:'',
            error : {
                account : false,
                name : false,
                empid : false,
                password : false,
                userid:false
            }
        }
    }
    signup = () =>{
       

        if( this.state.name !== '' && this.state.empid !== '' && this.state.account !== '' && this.state.password !== '' && this.state.error.password === false && this.state.error.empid === false ){
         
            var link = "http://localhost:8123/user/"+this.state.name+"/"+this.state.empid+"/"+this.state.account+"/"+this.state.password+"/"+this.state.userid
            axios.post(link).then(res => {
                alert("New user created successfully")
                console.log(res)
            })

            this.setState({
                account : '',
                name : '',
                empid : '',
                userid:'',
                password : '',
                cpassword : '',
                error : {
                    account : false,
                    name : false,
                    empid : false,
                    password : false,
                    userid:false,
                }
            })

        }
    }
    
    formHandler = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    componentDidUpdate(){
        console.log(this.state)
    }


    render()
    {


        return(
         
            <header>
                 <div className="cm"><img src="cm.png" alt="cm"/></div>
          <div className="container font centersignup">
          
                <div className="row">
                
                    <div className="col-xl-4"> </div>
                    <div className="col-xl-4">                      
                            <form >
                                <div className="form-group">
                                <label htmlFor="text">Name:</label>
                                <input type="text" className="form-control"value={this.state.name}  id="name" placeholder="Enter name" name="name" onChange={this.formHandler.bind(this)}/>
                                </div>
                                <div className="form-group">
                                <label htmlFor="text">Employee Id:</label>
                                <input type="text" className="form-control" value={this.state.empid} id="empid" placeholder="Enter Employee Id" name="empid" onChange={this.formHandler.bind(this)}/>
                                </div>
                                <div className="form-group">
                                <label htmlFor="text">User Id:</label>
                                <input type="text" className="form-control" value={this.state.userid}  id="userid" placeholder="Enter userid" name="userid" onChange={this.formHandler.bind(this)}/>
                                </div>
                                <div className="form-group">
                                <label htmlFor="pwd">Password:</label>
                                <input type="password" className="form-control" value={this.state.password}  id="pwd" placeholder="Enter password" name="password" onChange={this.formHandler.bind(this)} value={this.state.password}/>
                                </div>
                                <div className="form-group">
                                <label htmlFor="pwd">Confirm Password:</label>
                                <input type="password" className="form-control" value={this.state.cpassword}  id="cpwd" placeholder="Enter password" name="cpassword" onChange={this.formHandler.bind(this)} value={this.state.cpassword}/>
                                </div>
                              
                                <div className="form-check inline">
                                        <label className="form-check-label" htmlFor="radio1">
                                            <input type="radio" className="form-check-input"  name="account" onChange={this.formHandler.bind(this)} id="radio1"  value="employee"/>Employee
                                        </label>
                                        </div>
                                        <div className="form-check inline">
                                        <label className="form-check-label" htmlFor="radio2">
                                            <input type="radio" className="form-check-input" name="account" onChange={this.formHandler.bind(this)} id="radio2"  value="admin"/>Admin
                                        </label>
                                        </div>
                                        <div className="form-check inline">
                                        <label className="form-check-label" htmlFor="radio3">
                                            <input type="radio" className="form-check-input"  name="account" onChange={this.formHandler.bind(this)} id="radio3" value="hr" />HR
                                        </label>
                                        </div>
                                 
                          <div style={{paddingTop:"15px"}}>           
                   <button type="button" className="btn btn-outline-success" onClick={this.signup.bind(this)}  >signup</button>
         <Link to="/login"><button type="button" className="btn btn-outline-success" >login</button>  </Link></div> 
                            </form>
                    </div>
                    </div>
                    <div className="col-xl-5"> </div>
                    </div>
         
          </header>
         
        )
    }
}
export default Signup;

