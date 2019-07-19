import React from 'react';
import axios, { post } from 'axios';



class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      employeeId: '',
      sex: '',
      age: '',
      designation: '',
      qualification: '',
      yearsOfExperiance: '',
      imgsrc: ''


    };

  }
  EmployeeDetail = [];

  signup = () => {
    // this.fileUpload(this.state.file).then((response)=>{
    //   console.log(response.data);
    // })

    console.log(this.state);

    if (this.state.name !== '' && this.state.employeeId !== '' && this.state.sex !== '' && this.state.age !== '' && this.state.designation !== '' && this.state.qualification !== '' && this.state.yearsOfExperiance !== '' && this.state.imgsrc !== '') {

      var link = "http://localhost:8123/admin/"
      const fm = new FormData()
      fm.append("name", this.state.name)
      fm.append("empid", this.state.employeeId)
      fm.append("sex", this.state.sex)
      fm.append("age", this.state.age)
      fm.append("des", this.state.designation)
      fm.append("qual", this.state.qualification)
      fm.append("yoe", this.state.yearsOfExperiance)
      fm.append("image", this.state.imgsrc)
      axios.post(link, fm).then(res => {
        alert("New user created successfully")
        console.log(res)
      })
      this.setState({
        name: '',
        employeeId: '',
        sex: '',
        age: '',
        designation: '',
        qualification: '',
        yearsOfExperiance: '',
        imgsrc: ''

      })

    }
  }


  // fileUpload(file){


  //   const formData = new FormData();
  //   formData.append('file',file)
  //   const config = {
  //       headers: {
  //           'content-type': 'multipart/form-data'
  //       }
  //   }
  //   const url = 'http://localhost:8123/upload/';
  //   return  axios.post(url,formData,config)
  // }
  formHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  loadToLocal() {



    // this.EmployeeDetail.push(this.state);

    this.EmployeeDetail = JSON.parse(localStorage.getItem('detail'));
    this.EmployeeDetail.push(this.state);

    const detailToStore = JSON.stringify(this.EmployeeDetail);
    console.log(detailToStore);
    localStorage.setItem('detail', detailToStore);

  }



  imageUpload = (e) => {

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      this.setState({
        file: file,
        imgsrc: reader.result
      });
    }
    reader.readAsDataURL(file);





    // const image2base64 = require('image-to-base64');
    // image2base64(e.target.files[0]) // you can also to use url
    //     .then(
    //         (response) => {
    //             this.setState({imgsrc:response});
    //             // console.log(response); //cGF0aC90by9maWxlLmpwZw==
    //         }
    //     )
    //     .catch(
    //         (error) => {
    //             console.log(error); //Exepection error....
    //         }
    //     )
    //   // const file = e.target.files[0];
    //   // getBase64(file).then(base64 => {       
    //   //   this.setState({imgsrc:base64  });
    //   //   console.debug("file stored",base64);
    //   // });
  }

  render() {
    return (
      <div className="formbg top">
        <div className="container" id="fontdesign" style={{ width: "1300px" }} >
          <div className="row">

            <div className="col-xs-4"></div>
            <div className="col-xs-4">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>EmployeeId:</label>
                  <input type="text" className="form-control" value={this.state.employeeId} onChange={(e) => this.setState({ employeeId: e.target.value })} />
                </div>




                <div className="form-check">
                  <label className="form-check-label" htmlFor="radio1">
                    <input type="radio" className="form-check-input" name="account" onChange={(e) => this.setState({ sex: e.target.value })} id="radio1" value="male" />Male
                                        </label>


                  <label className="form-check-label" htmlFor="radio2">
                    <input type="radio" className="form-check-input" name="account" onChange={(e) => this.setState({ sex: e.target.value })} id="radio2" value="female" />Female
                                        </label>
                </div>


                <div className="form-group">
                  <label>Designation:</label>
                  <input type="text" className="form-control" value={this.state.designation} onChange={(e) => this.setState({ designation: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Age:</label>
                  <input type="text" className="form-control" value={this.state.age} onChange={(e) => this.setState({ age: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Qualification:</label>
                  <input type="text" className="form-control" value={this.state.qualification} onChange={(e) => this.setState({ qualification: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Years Of Experiance:</label>
                  <input type="text" className="form-control" value={this.state.yearsOfExperiance} onChange={(e) => this.setState({ yearsOfExperiance: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Employee Image:</label>
                  <input
                    type="file"
                    id="imageFile"
                    name='imageFile'
                    onChange={(e) => { this.setState({ imgsrc: e.target.files[0] }) }}
                    accept="image/*" />
                </div>

                <button type="button" onClick=
                  // e.preventDefault(); 
                  // this.loadToLocal()
                  {this.signup.bind(this)}
                  className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Register;