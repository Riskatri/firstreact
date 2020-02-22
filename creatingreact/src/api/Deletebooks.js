import React from "react";
import axios from "axios";

export default class BookList extends React.Component {
  state = {
    id: ""
  };

  handleChange = event => {
    this.setState({ id: event.target.value });
  };

  handleSubmit = event => {
    alert("Book Has been deleted!");
    event.preventDefault();
    axios.delete(`http://127.0.0.1:4000/books/${this.state.id}`).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Book ID:
            <input type="text" name="id" onChange={this.handleChange} />
          </label>
          <button type="submit">Delete</button>
        </form>
      </div>
    );
  }
}
