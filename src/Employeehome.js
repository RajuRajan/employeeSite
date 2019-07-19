import React from 'react';
import * as jwt_decode from 'jwt-decode';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

class Employeehome extends React.Component {

    constructor() {
        super();
        this.state = {
            crypt: null,
            description: '',
            daysofleave: '',
            name: '',
            empid: '',
            approval: '',
            pending: [],
            startDate: new Date(),
            endDate: new Date(),
            datetoday: moment(),
            show: "none",
            days: 1,
            type: '',
            session: '',
            button:false
        }
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);

    }

    notify = () =>{
      
 
        toast.success("Sending Mail", {
          position: toast.POSITION.TOP_CENTER
        });
   
     
    };

    handleChangeStart(date) {
        this.setState({
            startDate: date, datetoday: moment(date).format('YYYY-MM-DD')
        });
        this.log(moment(this.state.datenext).diff(moment(this.state.datetoday), 'day'))
            
    }


    handleChangeEnd(date) {
        this.setState({
            endDate: date, datenext: moment(date).format('YYYY-MM-DD')
        });
       


    }
    message = () => {

        this.setState({ show: "inline-block" })
        var link = "http://localhost:8123/leavecheck/" + this.state.empid + "/" + this.state.name + "/" + this.state.datetoday
        axios.post(link).then(res => {

            console.log(res.data.Date)
            if (res.data.Date === '') {

                if (this.state.description !== '' && this.state.empid !== '' && this.state.daysofleave !== 0 && this.state.name !== '' && this.state.datetoday !== '') {
                    this.setState({button:true});
                    this.notify();
                    console.log(this.state.datecheck);
                    if (this.state.datetoday !== this.state.datecheck) {

                        var link = "http://localhost:8123/emphome/" + this.state.description + "/" + this.state.empid + "/" + this.state.daysofleave + "/" + this.state.name + "/" + this.state.datetoday +"/"+this.state.datenext+"/"+this.state.type
                        axios.post(link).then(res => {
                            alert("mailed successfully")
                            this.setState({button:false})
                          
                        })
                    }
                    else {
                        alert("applied leave already");
                    }
                }
            }
            else {
                alert("already applied");
            }
        })
    }
    componentWillMount() {
        var token = localStorage.getItem('token');
        this.setState({
            crypt: jwt_decode(token).accounttype,
            name: jwt_decode(token).name,
            empid: jwt_decode(token).empid,
        })
        var link = "http://localhost:8123/pendingapproval/" + jwt_decode(token).empid + "/" + jwt_decode(token).name
        axios.post(link).then(res => {
            console.log(res.data);
            this.setState({ pending: res.data })
        });
    }
    formhandeler = (event) => {
        console.log("formhandler")
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    approval() {
        if (this.state.empid !== '' && this.state.name !== '') {

            var link = "http://localhost:8123/approval/" + this.state.name + "/" + this.state.empid
            axios.post(link).then(res => {
                this.setState({ approval: res.data.Accepted })

            })
        }
    }

    log(str) {
         this.state.daysofleave=str;
        return str;
    };


    render() {
        if (this.state.crypt !== "employee" || this.state.crypt === null) {
            return (
                <Redirect to="/" />
            )

        }
        
        return (

            <header>

                <Link to="/"><button type="button" id="logout" className="btn btn-outline-success" >logout</button>  </Link>

                <div className="cm">
                    <img src="cm.png" alt="cm" />
                </div>
                <h2>Employee Page...</h2>
               
                <div className="container font ">
                    <div className="cardcenter">
                        <div className="row">
                            <div className="col-xl-3">
                                <img src="avatar.png" alt="avatar" heigth="200px" width="200px" />
                            </div>
                            <div className="col-xl-2 acme" style={{paddingTop:"80px"}}>
                                <p>NAME</p>
                                <p>EMPLOYEE ID</p>

                            </div>
                            <div className="col-xl-3 acme" style={{paddingTop:"80px"}}>
                                <p>{this.state.name}</p>
                                <p>{this.state.empid}</p>

                            </div>
                           
                            <ToastContainer autoClose={3000}/>
                            <div className="col-xs-2" id="p_align" style={{paddingLeft:"170px"}}>
                                <div className="leave" data-toggle="modal" data-target="#myModalleave" data-backdrop="static" data-keyboard="false">
                                    <img src="leave3.png" alt="leave" heigth="100px" width="100px" />
                                    <p>Register for Leave</p>
                                </div>
                            </div>
                            <div className="col-xs-2" id="p_align">
                                <div className="approval" data-toggle="modal" data-target="#myModalapproval" data-backdrop="static" data-keyboard="false" onClick={this.approval.bind(this)}>
                                    <img src="approval.png" alt="approval" heigth="100px" width="100px" />
                                    <p>Pending confirmation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="myModalleave" >
                    <div className="modal-dialog" style={{ maxWidth: "900px" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Permission for Leave</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            
                            <div className="modal-body" style={{ height: '400px', overflowY: 'scroll' }}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className='form-group'>
                                            <label>From</label>
                                            <div  >   <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleChangeStart}
                                                className='form-control'
                                            /></div>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='form-group'>
                                            <label>To</label><br></br>
                                            <DatePicker
                                                selected={this.state.endDate}
                                                onChange={this.handleChangeEnd}
                                                className='form-control'
                                            />
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className='form-group'>
                                            <label>Reason</label>
                                            <textarea className="form-control "  c rows='3' style={{ resize: "none" }} id="reason" placeholder="Enter reason" name="description"  required onChange={this.formhandeler.bind(this)} />

                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className='form-group'>
                                            <label>Type of Leave</label>
                                            <select name='type' className="form-control" onChange={this.formhandeler.bind(this)}>
                                            <option value="">--Select--</option>
                                                <option value="Casual">Casual</option>
                                                <option value="Official">Official</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='form-group'>
                                            <label>Session</label>
                                            <select name='session' className="form-control" onChange={this.formhandeler.bind(this)}>
                                            <option value="">--Select--</option>
                                                <option value="Halfday">HalfDay</option>
                                                <option value="Fullday">Fullday</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-group">

                                            <label htmlFor="text">No of days</label>
                                            <p className="days">{parseInt(this.log(moment(this.state.datenext).diff(moment(this.state.datetoday), 'day')))
                                        +1 }</p>
                                            
                                          
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="modal-footer">
    
                                <button type="button" className="btn btn-outline-success" onClick={this.message} disabled={this.state.button}>send</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="modal" id="myModalapproval">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Permission status</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Days of Leave</th>
                                            <th>status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.pending.length > 0 ?
                                            this.state.pending.map((element, index) => {
                                              
                                                return (
                                                    <tr>
                                                        <td>{element.Date}</td>
                                                        <td style={{ textAlign: "center" }}>{element.Daysofleave}</td>
                                                        {console.log(element.Accepted)}
                                                        <td> {element.Accepted === "rejected" ?
                                                            <p style={{ color: "red" }}>Sorry Permission Rejected</p> : this.state.approval === "yes" ?
                                                                <p style={{ color: "green" }}>Permission accepted</p> :
                                                                <p>Pending</p>}</td>
                                                    </tr>
                                                )
                                            }) : ""}

                                    </tbody>
                                </table>

                            </div>


                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>


        )
    }
}
export default Employeehome;