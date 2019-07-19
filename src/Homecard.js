import React from 'react';
import './card.css';

class HomeCard extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            name:props.item.name,
            employeeId:props.item.employeeId,
            sex:props.item.sex,
            age:props.item.age,
            designation:props.item.designation,
            qualification:props.item.qualification,
            yearsOfExperiance:props.item.yearsOfExperiance,
            imgsrc:props.item.imgsrc
        }
    }
    render()
    {       
        return(
            
          
            <div style={{width: 200 ,textAlign: "center",backgroundColor: '#edd8f0',height: "400px"}}>
             <div><img src="emp1.jpg" alt="img" width="150px" heigth="150px" /></div>
            <div className="card-body" id={this.props.keyitem}>
            
                <p className="card-title" id="fontdesign3" style={{ textShadow: "2px #FF0000"}}>{this.state.name}</p>
                EMPLOYEEID
                <p className="card-text" id="fontdesign3"> {this.state.employeeId}</p>
                DESIGNATION
                <p className="card-text" id="fontdesign3"> {this.state.designation}</p>
        
                <button className="btn btn-primary" data-toggle="modal" data-target={`#${this.props.keyitem}`} data-backdrop="static" data-keyboard="false"> View</button>
        
                <div className="container">
                    <div className="row">
        
                        <div className="modal" id={this.props.keyitem}>
        
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Employee</h4>
        
                                    </div>
                                    <div className="modal-body">
                                        <div className="box card-shadow">
                                            <div className='container'>
                                                <div className="row">
                                                    <div className="col-xs-4"><img width="150px" height="150px" src={this.state.imgsrc} alt="emp img "></img>
                                                    </div>
        
        
                                                    <div className="col-xs-8">
                                                        <div className="row">
        
                                                            <div className="col-sm-4" id="fcard">
                                                                <p>NAME</p>
                                                                <p>EMPLOYEEID</p>
                                                                <p>AGE</p>
                                                                <p>DESIGNATION</p>
                                                                <p>QUALIFICATION</p>
                                                                <p>EXPERIANCE</p>
                                                            </div>
                                                            <div className="col-sm-7" id="fontdesign2">
                                                                <p>{this.state.name}</p>
                                                                <p> {this.state.employeeId}</p>
                                                                <p>{this.state.age}</p>
                                                                <p> {this.state.designation}</p>
                                                                <p>{this.state.qualification}</p>
                                                                <p>{this.state.yearsOfExperiance}
                                                                </p>
                                                            </div>
        
                                                        </div>
        
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xs-12">
                                                            <p>Employee job descriptions identify and spell out the responsibilities of a specific job. They also include information about working conditions, tools, equipment used, knowledge and skills needed, and
                                                                relationships with other positions including the immediate boss.</p>
                                                        </div>
                                                    </div>
        
        
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
        </div>   
        )
    }
}

export default HomeCard;