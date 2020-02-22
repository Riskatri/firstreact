import React, { Component } from "react";
import axios from "axios";

class Activities extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const res = await axios.get("http://127.0.0.1:4000/books/" + id);
    this.setState({ res });
  }
  render() {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}> Activities</h3>
        <div>
          {this.state.data.map(book => (
            <ul key={book.id} class="list-group card card-1">
              <li class="list-group-item">{book.title}</li>
            </ul>
          ))}
        </div>
      </div>
    );
  }
}

export default Activities;
