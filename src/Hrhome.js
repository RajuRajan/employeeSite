import React from 'react';
import * as jwt_decode from 'jwt-decode';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import AcceptLeave from './Acceptleave';


class Hrhome extends React.Component{

constructor(){
    super();
    this.state={
        crypt:null,
        pendinglist:[],
        show:"block",
        empid:'',
        empname:'',
        date:''
    }
}



componentWillMount(){
    var token=localStorage.getItem('token');
    this.setState({crypt:jwt_decode(token).accounttype , empname:jwt_decode(token).name,empid:jwt_decode(token).empid});
  
    console.log(this.state);
    var link = "http://localhost:8123/pending"
     axios.get(link).then(res => {
         console.log("object",res.data)
         this.setState({pendinglist:res.data});
    });

   
}
    render()
    {
     
            if(this.state.crypt !=="hr" || this.state.crypt==null)
            {
                console.log("crypt");
                return( 
              
                <Redirect to="/" />
                )
            }
           console.log(this.state); 
           if(this.state.pendinglist.length > 0){
            return(
                <header>
                    <Link to="/"><button type="button" id="logout" className="btn btn-outline-success" >logout</button>  </Link>
                <div className="cm">
                    <img src="cm.png" alt="cm" />
                </div>
                <h2>HR Page...</h2> 
                <div className="container font">
                    <div className="cardcenter">
                        <div className="row">
                            <div className="col-xl-3">
                                <img src="avatar.png" alt="avatar" heigth="200px" width="200px" />
                            </div>
                            <div className="col-xl-4" style={{paddingTop:"80px"}}>
                                <p>NAME</p>
                                <p>EMPLOYEE ID</p>
                            
                            </div>
                            <div className="col-xl-4"  style={{paddingTop:"80px"}}>
                                <p>{this.state.empname}</p>
                                <p>{this.state.empid}</p>
                            
                            </div>
                            <div className="col-xs-2" id="p_align" style={{paddingLeft:"170px"}}>
                                <div className="leave" data-toggle="modal" data-target="#myModalleave" data-backdrop="static" data-keyboard="false">
                                    <img src="leave3.png" alt="leave" heigth="100px" width="100px" />
                                    <p>Pending Leave Approval</p>
                                </div>
                            </div>
                            <div className="col-xs-2" id="p_align">
                                <div className="approval" data-toggle="modal" data-target="#myModalapproval" data-backdrop="static" data-keyboard="false">
                                    <img src="approval.png" alt="approval" heigth="100px" width="100px" />
                                    <p>Approved Request</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="myModalleave">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Pending Request</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                            
                        
                        { this.state.pendinglist.map((element,index) => (
                           <AcceptLeave key={index} e={element}/>
                         ))}</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal" id="myModalapproval">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Modal Heading</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">approval</div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        
            )}else{
            return(
                <div>no data</div>
            )
        }
            
    }

}
export default Hrhome;