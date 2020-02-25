import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Register() {
  const [form, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    roles: ["ADMIN"]
  });
  const [status, setStatus] = useState({
    isRedirect: false
  });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post("http://127.0.0.1:8000/register", {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        roles: form.roles
      });

      console.log(result.data);
      if (result.status === 201) {
        alert("register sucessfuly!");
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
  if (status.isRedirect === true) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="prof">
      <div className="card-header bg-dark text-white">Register</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label>Name </label>
            <input
              value={form.name}
              type="text"
              name="name"
              onChange={handleChange}
              class="form-control text-dark"
              placeholder="name"
            />
          </div>
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
            <label>Email </label>
            <input
              value={form.email}
              type="email"
              name="email"
              onChange={handleChange}
              class="form-control"
              placeholder="email address"
            />
            <small id="emailHelp" class="text-Dark">
              We'll never share your email with anyone else.
            </small>
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
export default Register;
