import React, { useState } from "react";
import axios from "axios";
import createPersistedState from "@plq/use-persisted-state";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const [usePersistedState] = createPersistedState(
    "token",
    window.sessionStorage
  );

  const [form, setValues] = useState({
    username: "",
    password: ""
  });
  const [token, getToken] = usePersistedState("token", "");
  const [role, setRole] = useState({
    redirect: true
  });

  const handlerSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post("http://127.0.0.1:8000/login", {
        username: form.username,
        password: form.password
      });
      getToken(result.data);
      setRole(result.data.Role);
      console.log(result.data.accessToken);
      if (result.status === 200) {
        alert("login sucessfuly!");
        // setStatus({ redirect: true });
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
    username: "",
    password: ""
  };
  const { register, errors, reset } = useForm({
    defaultValues
  });

  if (role === "ADMIN") {
    return <Redirect to="/post/books" />;
  } else if (role === "USER") {
    return <Redirect to="/get/books" />;
  } else {
    return (
      <div className="prof">
        <div className="card-header bg-dark text-white">Login</div>
        <div className="card-body">
          <form onSubmit={handlerSubmit}>
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
              <label>Password </label>

              <input
                value={form.password}
                type="password"
                ref={register({
                  required: "You must specify a password",
                  minLength: {
                    value: 5,
                    message: "Password must have at least 5 characters"
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
}
export default Login;
