import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateClock(), 1000);
  }
  updateClock() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <p>Hello, selamat datang!</p>
        <p>It is {this.state.date.toLocaleTimeString()}.</p>
      </div>
    );
  }
}
export default Clock;
