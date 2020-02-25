import React from "react";
import axios from "axios";
// import createPersistedState from "@plq/use-persisted-state";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handlerChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://127.0.0.1:8000/login",
        this.state
      );
      // getToken(result.data);
      console.log(result.data.accessToken);
      if (result.status === 200) {
        alert("login sucessfuly!");
      } else {
        throw new Error("Failed to login!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="container mt-5">
        <div class="card-header bg-secondary">
          <div class="card-header bg-dark text-white">Login</div>
          <div class="card-body">
            <form onSubmit={this.handlerSubmit}>
              <div class="form-group">
                <label>Username </label>
                <input
                  value={username}
                  type="text"
                  name="username"
                  onChange={this.handlerChange}
                  class="form-control"
                  placeholder="username"
                />
              </div>
              <div class="form-group">
                <label>Password </label>

                <input
                  value={password}
                  type="password"
                  name="password"
                  onChange={this.handlerChange}
                  class="form-control"
                  placeholder="password"
                />
              </div>

              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
