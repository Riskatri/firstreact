import React from "react";
import axios from "axios";
import "../userProfile/profile.css";

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }
  componentDidMount = async () => {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    const id = this.props.match.params.id;
    const result = await axios({
      method: "get",
      url: "http://127.0.0.1:7000/comments/" + id,
      data: this.state,
      headers: {
        Authorization: token.token.accessToken
      }
    });
    console.log(result);
    this.setState({
      status: result.data.status
    });
  };

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
        method: "put",
        url: "http://127.0.0.1:7000/comments/" + id,
        data: this.state,
        headers: {
          Authorization: token.token.accessToken
        }
      });
      console.log(result);

      if (result.status === 201) {
        alert("Data update sucessfuly!");
      } else {
        throw new Error("Failed to update data!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { status } = this.state;

    return (
      <div className="prof">
        <div className="card-header bg-secondary">
          <div className="card-header bg-dark text-white">Update Comment</div>
          <div className="card-body">
            <form onSubmit={this.handlerSubmit}>
              <div class="form-group">
                <label>Status</label>
                <input
                  value={status}
                  type="text"
                  name="status"
                  onChange={this.handlerChange}
                  class="form-control"
                  placeholder="status"
                />
              </div>

              <button type="submit" className="btn btn-dark">
                update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Update;
