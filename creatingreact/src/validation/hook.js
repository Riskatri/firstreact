import React, { useRef } from "react";
import { useForm } from "react-hook-form";

const Example = () => {
  const { handleSubmit, register, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign up</h2>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          name="name"
          ref={register({
            validate: value => value !== "admin" || "Nice try!"
          })}
          placeholder="Name"
          class="form-control"
          id="name"
        />
      </div>

      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          ref={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address"
            }
          })}
          placeholder="Email"
          class="form-control"
          id="email"
        />
        {errors.email && errors.email.message}

        <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>

      <div class="form-group">
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

      <div class="form-group">
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
    </form>
  );
};
export default Example;
