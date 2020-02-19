import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import "../userProfile/profile.css";

const Example = () => {
  const { handleSubmit, register, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="hook">
        <h2>Sign up</h2>
        <div class="col-md-4 mb-3">
          <label for="name">Name</label>
          <input
            name="name"
            type="text"
            ref={register({
              required: true
            })}
            placeholder="Name"
            class="form-control"
          />
          <div class="valid-feedback">Looks good!</div>
        </div>

        <div class="col-md-4 mb-3">
          <label for="email">Email address</label>
          <input
            type="email"
            ref={register({
              required: "must be in the form of mail",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address"
              }
            })}
            placeholder="Email"
            class="form-control"
          />
          {errors.email && errors.email.message}

          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div class="col-md-4 mb-3">
          <label for="password">Password</label>
          <input
            name="password"
            type="password"
            ref={register({
              required: "You must specify a password",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
              }
            })}
            placeholder="password"
            class="form-control"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div class="col-md-4 mb-3">
          <label for="password">Confirm Password</label>
          <input
            name="password_repeat"
            type="password"
            ref={register({
              validate: value =>
                value === password.current || "The passwords do not match"
            })}
            placeholder="confirm password"
            class="form-control"
          />
          {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
    </form>
  );
};
export default Example;
