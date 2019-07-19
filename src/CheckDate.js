import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


class CheckDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      days: 0,
    };
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.daysLeft = this.daysLeft.bind(this);

  }

  handleChangeStart(date) {
    this.setState({
      startDate: date
    }, () => this.daysLeft());
  }
  
  
  handleChangeEnd(date) {
    this.setState({
      endDate: date
    }, () => this.daysLeft());
  }

daysLeft() {
    let {startDate, endDate} = this.state;
    console.log(startDate);
    console.log(endDate);
    let amount = endDate.diff(startDate, 'days');
    this.setState({
      days: amount
    });
  }



  render() {
    return (
     <div>
          <h3>Get Difference between two dates in days</h3>

<b>Start Date</b>:
 <DatePicker
   selected={this.state.startDate}
   onChange={this.handleChangeStart}
 />

&nbsp;&nbsp;&nbsp;

<b>End Date</b>:
 <DatePicker
   selected={this.state.endDate}
   onChange={this.handleChangeEnd}
 />

 <div className="amount">
   {this.state.days}
 </div>

</div>
    );
  }
}
export default CheckDate;