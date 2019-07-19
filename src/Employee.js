import React from 'react';
import HomeCard from './Homecard';
import { BrowserRouter as Router } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';
import axios from 'axios';
import './card.css';
import avatar from './avatar.png';


class Employee extends React.Component {
    constructor() {
        super();
        this.state = {
            crypt: null,

            empname: '',
            empid: '',
            list: '',
            length:''
        }
    }



    componentWillMount() {
        var token = localStorage.getItem('token');
        this.setState({ crypt: jwt_decode(token).accounttype, empname: jwt_decode(token).name, empid: jwt_decode(token).empid });
        var link = "http://localhost:8123/emplist"
        axios.get(link).then(res => {
            console.log(res.data);
            console.log(res.data.length);
            
            this.setState({ list: res.data ,length:res.data.length})
          
        })
    }


    render() {
        return (

            <div className="emp">
                <Router>
                    <div className="row">                        
                    { this.state.length>0? 
                        this.state.list.map((element,index) => { 
                          return( 
                           <div className="col-4" style={{paddingTop:"5px"}}> 
                                <div className="flip-card" id={index} >
                                        <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                          {console.log("data:image/png;base64,"+element.Imgsrc)}
                                          {console.log(element.Imgsrc)} 
                                            <img src={"http://localhost:8123/"+element.Imgsrc} alt="Avatar" style={{width:"300px",height:"300px"}} />
                                        </div>
                                        <div className="flip-card-back ">
                                        <table className="table ">
                                  
                                    <tbody class="acme" style={{textAlign:"left",color:"black"}}>
                                       
                                               
                                              
                                                    <tr >
                                                        <td>Name</td>
                                                        <td >{element.Name} </td>                                          
                                                    </tr>
                                                    <tr>
                                                        <td> Employee ID </td>
                                                        <td >{element.EmployeeId} </td>                                          
                                                    </tr>
                                                    <tr>
                                                        <td>Designation</td>
                                                        <td >{element.Designation}</td>                                          
                                                    </tr>
                                                    <tr>
                                                        <td>Qualification</td>
                                                        <td >{element.Qualification}</td>                                          
                                                    </tr>
                                                    <tr>
                                                        <td>Years of Experiance</td>
                                                        <td >{element.YearsOfExperiance}</td>                                          
                                                    </tr>

                                    </tbody>
                                </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                         )
                      }):""}
                    
                    </div>
                    </Router>
            </div>
          
        )


    }
}
export default Employee;