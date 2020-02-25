import React, { useState } from "react";
import axios from "axios";
import createPersistedState from "@plq/use-persisted-state";

function Login() {
  const [usePersistedState] = createPersistedState(
    "token",
    window.sessionStorage
  );
  const [form, setValues] = useState({
    username: "",
    password: ""
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
      } else {
        throw new Error("Failed to login!");
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
  return (
    <div className="prof">
      <div class="card-header bg-dark text-white">Login</div>
      <div class="card-body">
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

          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
