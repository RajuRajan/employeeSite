import React from 'react';
import axios from 'axios';


class AcceptLeave extends React.Component {

    constructor(props){
        super(props)
        this.state={
            show:"block"
        }
    }


    acceptleave(empname,empid,date){
      //  this.updatepending()
        var link = "http://localhost:8123/acceptleave/"+empname+"/"+empid+"/"+date
        axios.post(link).then(res => {
       })
        this.setState({show:"none"})  
    
    }
    rejectedleave(empname,empid,date){
       // this.updatepending()
        var link = "http://localhost:8123/rejectleave/"+empname+"/"+empid+"/"+date
        axios.post(link).then(res => {
       })
      
        this.setState({show:"none"})
        
    }
    updatepending(){
        var link = "http://localhost:8123/pending"
        axios.get(link).then(res => {
           
          this.setState({pendinglist:res.data})
       })
    }
    
    render() {
        return (
            <div style={{display:this.state.show}}>
               { this.props.e.Accepted!=="rejected" && this.props.e.Accepted!=="yes"?
                            <div className="container">
                                <div className={"card "}  style={{width: "800px",}}>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <img className="card-img-top" src="avatar.png" alt="card" style={{width: "200px"}}/>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="card-body">
                                                <h4 className="card-title">{this.props.e.Empname}</h4>
                                                <div className="row">
                                               <div className="col-6"> <p className="card-text">Days of Leave:</p> </div> <div className="col-6">{this.props.e.Daysofleave} </div>
                                               <div className="col-6"> <p className="card-text">Date:</p>  </div> <div className="col-6">{this.props.e.Date} </div>
                                               <div className="col-6">   <p className="card-text"> Reason:</p> </div>  <div className="col-6">{this.props.e.Description} </div>
                                                </div>
                                              
                                                <button className="btn btn-success" onClick={()=>{this.acceptleave(this.props.e.Empname,this.props.e.Empid,this.props.e.Date)}}>Accept</button>
                                                <button className="btn btn-danger" onClick={()=>{this.rejectedleave(this.props.e.Empname,this.props.e.Empid,this.props.e.Date)}}>Ignore</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>:"" }
            </div>
   
        )
    }
}

export default AcceptLeave;