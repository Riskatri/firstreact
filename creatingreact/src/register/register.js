import React from "react";
import axios from "axios";

export const Register = () => {
  const initialState = {
    name: "",
    username: "",
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };
  const [data, setData] = React.useState(initialState);

  const handlerChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handlerSubmit = async event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    await axios.post("http://127.0.0.1:8000/register", this.initialState);
    alert(" Succesfully!");
  };
  return (
    <div className="container mt-5">
      <div class="card-header bg-secondary">
        <div class="card-header bg-dark text-white">Register</div>
        <div class="card-body">
          <form onSubmit={handlerSubmit}>
            <div class="form-group">
              <label>Name </label>
              <input
                type="text"
                value={data.name}
                name="name"
                onChange={handlerChange}
                class="form-control"
                placeholder="name"
              />
            </div>
            <div class="form-group">
              <label>Username </label>
              <input
                value={data.username}
                type="text"
                name="username"
                onChange={handlerChange}
                class="form-control"
                placeholder="username"
              />
            </div>
            <div class="form-group">
              <label>Email </label>

              <input
                value={data.email}
                type="email"
                name="email"
                onChange={handlerChange}
                class="form-control"
                placeholder="email"
              />
            </div>
            <div class="form-group">
              <label>Password </label>

              <input
                value={data.password}
                type="string"
                name="password"
                onChange={handlerChange}
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
};
