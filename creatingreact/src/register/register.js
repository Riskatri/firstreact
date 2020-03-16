import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

function Register() {
  const [form, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    roles: ["USER"]
  });

  const [status, setStatus] = useState({
    redirect: false
  });

  const handlerSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post("http://127.0.0.1:8015/register", {
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        roles: form.roles
      });

      console.log(result.data);
      if (result.status === 201) {
        alert("register sucessfuly!");
        setStatus({ redirect: true });
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
  const defaultValues = {
    name: "",
    username: "",
    email: "",
    password: ""
  };
  const { register, errors, reset } = useForm({
    defaultValues
  });

  if (status.redirect === true) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="prof">
      <div className="card-header bg-dark text-white">Register</div>
      <div className="card-body">
        <form onSubmit={handlerSubmit}>
          <div class="form-group">
            <label>Name </label>
            <input
              value={form.name}
              type="text"
              ref={register({
                required: "Please, fill your name"
              })}
              name="name"
              onChange={handleChange}
              class="form-control text-dark"
              placeholder="name"
            />
            {errors.name && errors.name.message}
          </div>
          <div class="form-group">
            <label>Username </label>
            <input
              value={form.username}
              type="text"
              ref={register({
                required: "Please, fill your username",
                minLength: 6,
                message: "username harus minimal 6"
              })}
              name="username"
              onChange={handleChange}
              class="form-control"
              placeholder="username"
            />
            {errors.username && errors.username.message}
          </div>
          <div class="form-group">
            <label>Email </label>
            <input
              value={form.email}
              type="email"
              ref={register({
                required: "Please, fill your email address",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address"
                }
              })}
              name="email"
              onChange={handleChange}
              class="form-control"
              placeholder="email address"
            />
            {errors.email && errors.email.message}
          </div>
          <div class="form-group">
            <label>Password </label>

            <input
              value={form.password}
              type="password"
              ref={register({
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters"
                }
              })}
              name="password"
              onChange={handleChange}
              class="form-control"
              placeholder="password"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="btn btn-dark"
            onClick={() => {
              reset(defaultValues);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default Register;
