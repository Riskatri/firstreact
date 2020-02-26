import React from "react";
import axios from "axios";
import "../userProfile/profile.css";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      bookId: ""
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
        url: "http://127.0.0.1:8000/orders/" + id,
        headers: {
          Authorization: token.token.accessToken
        },
        data: {
          userId: id,
          bookId: id
        }
      });
      console.log(result.data);

      if (result.status === 201) {
        alert("Order sucessfuly!");
        // window.location.reload(false);
      } else {
        throw new Error("Failed to order!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { userId, bookId } = this.state;

    return (
      <div className="prof">
        <div className="container">
          <div class="card-header bg-secondary">
            <div class="card-header bg-dark text-white">Order Book</div>
            <div class="card-body">
              <form onSubmit={this.handlerSubmit}>
                <div class="form-group">
                  <label>User Id</label>
                  <input
                    value={userId}
                    type="text"
                    name="userId"
                    onChange={this.handlerChange}
                    class="form-control"
                    placeholder="user id"
                  />
                </div>
                <div class="form-group">
                  <label>Book Id</label>

                  <input
                    value={bookId}
                    type="text"
                    name="bookId"
                    onChange={this.handlerChange}
                    class="form-control"
                    placeholder="book id"
                  />
                </div>

                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Order;
