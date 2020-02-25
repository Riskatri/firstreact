import React, { useState } from "react";
import axios from "axios";
import createPersistedState from "@plq/use-persisted-state";
import { Redirect } from "react-router-dom";

function Login() {
  const [usePersistedState] = createPersistedState(
    "token",
    window.sessionStorage
  );
  const [form, setValues] = useState({
    username: "",
    password: ""
  });
  const [status, setStatus] = useState({
    isRedirect: false
  });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post("http://127.0.0.1:8000/login", {
        username: form.username,
        password: form.password
      });
      getToken(result.data);
      console.log(result.data.accessToken);
      if (result.status === 200) {
        alert("login sucessfuly!");
        setStatus({ isRedirect: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const [token, getToken] = usePersistedState("token", "");
  if (status.isRedirect === true) {
    return <Redirect to="/post/books" />;
  }
  return (
    <div className="prof">
      <div className="card-header bg-dark text-white">Login</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label>Username </label>
            <input
              value={form.username}
              type="text"
              name="username"
              onChange={handleChange}
              class="form-control"
              placeholder="username"
            />
          </div>
          <div class="form-group">
            <label>Password </label>

            <input
              value={form.password}
              type="password"
              name="password"
              onChange={handleChange}
              class="form-control"
              placeholder="password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark"
            onSubmit={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
