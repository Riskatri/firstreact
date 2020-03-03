import React from "react";
import axios from "axios";
import "../userProfile/profile.css";
// import Artikel from "./artikelbyid";

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isi_comment: "",
      status: true
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
      const id = token.token.id;
      const artikelId = this.props.match.params.id;
      const result = await axios({
        method: "post",
        url: `http://127.0.0.1:7000/comments/${id}/${artikelId}`,
        data: this.state,
        headers: {
          Authorization: token.token.accessToken
        }
      });

      console.log(result);

      if (result.status === 201) {
        alert("comment successfully!");
      } else {
        throw new Error("Failed to update data!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { isi_comment } = this.state;

    return (
      <div>
        {/* {" "}
        <Artikel /> */}
        <div className="prof">
          <div className="card-header bg-light">
            <div className="card-body">
              <form onSubmit={this.handlerSubmit}>
                <div class="form-group">
                  <label>comment</label>
                  <input
                    value={isi_comment}
                    type="text"
                    name="isi_comment"
                    onChange={this.handlerChange}
                    class="form-control"
                    placeholder="comment"
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Update;
