import React from "react";
import axios from "axios";
import "../userProfile/profile.css";

class PostBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      judul: "",
      isi: "",
      userId: ""
      //   status: ""
    };
  }

  handlerChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlerSubmit = async event => {
    event.preventDefault();
    try {
      const token = JSON.parse(
        sessionStorage.getItem("persisted_state_hook:token")
      );
      const id = this.props.match.params.id;
      const result = await axios({
        method: "post",
        url: "http://127.0.0.1:7000/articles/" + id,
        data: this.state,
        headers: {
          Authorization: token.token.accessToken
        }
      });
      console.log(result);

      if (result.status === 201) {
        alert("Data inserted sucessfuly!");
      } else {
        throw new Error("Failed to insert data!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <form onSubmit={this.handlerSubmit}>
          <div className="input-group">
            <div className="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                title
              </span>
            </div>
            <input
              className="form-control"
              aria-label="small"
              value={this.state.judul}
              type="text"
              name="judul"
              onChange={this.handlerChange}
              placeholder="title"
            />
          </div>
          <br></br>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">articles</span>
            </div>

            <textarea
              className="form-control"
              aria-label="With textarea"
              value={this.state.isi}
              onChange={this.handlerChange}
              name="isi"
              placeholder="articles"
            ></textarea>
          </div>
          <br></br>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default PostBook;
