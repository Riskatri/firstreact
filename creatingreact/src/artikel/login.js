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
  const [admin, setAdmin] = useState({
    redirect: true
  });

  const handlerSubmit = async e => {
    try {
      const result = await axios.post("http://127.0.0.1:7000/login", {
        username: form.username,
        password: form.password
      });
      getToken(result.data);
      setAdmin(result.data.Admin);
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
  const { register, errors, handleSubmit } = useForm({
    defaultValues
  });

  if (admin === true) {
    return <Redirect to="/users" />;
  } else if (admin === false) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="prof">
        <div className="card-header bg-dark text-white">Login</div>
        <div className="card-body">
          <form onSubmit={e => e.preventDefault()}>
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
              onClick={handleSubmit(handlerSubmit)}
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
