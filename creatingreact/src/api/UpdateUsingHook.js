import React, { useState } from "react";
import axios from "axios";
import "../userProfile/profile.css";

function PutUsingHook() {
  const [values, setValues] = useState({
    id: "",
    title: "",
    author: "",
    published_date: "",
    pages: "",
    language: "",
    published_id: ""
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.put(
        "http://127.0.0.1:4000/books/" + values.id,
        {
          id: values.id,
          title: values.title,
          author: values.author,
          published_date: values.published_date,
          pages: values.pages,
          language: values.language,
          published_id: values.published_id
        }
      );

      if (result.status === 201) {
        alert("Data Update sucessfuly!");
      } else {
        throw new Error("Failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateField = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div>
      {" "}
      <a href="/get/books"> see list books</a>
      <div className="update">
        <div className="container">
          <div class="card-header bg-secondary">
            <div class="card-header bg-dark text-white">Update Book</div>
            <div class="card-body">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label>Book </label>
                  <input
                    type="number"
                    value={values.id}
                    name="id"
                    onChange={updateField}
                    class="form-control"
                    placeholder="Book ID"
                  />
                </div>
                <div class="form-group">
                  <label>Book Title </label>
                  <input
                    value={values.title}
                    type="text"
                    name="title"
                    onChange={updateField}
                    class="form-control"
                    placeholder="Book Title"
                  />
                </div>
                <div class="form-group">
                  <label>Author </label>

                  <input
                    value={values.author}
                    type="text"
                    name="author"
                    onChange={updateField}
                    class="form-control"
                    placeholder="Author"
                  />
                </div>
                <div class="form-group">
                  <label>published_date </label>

                  <input
                    value={values.published_date}
                    type="date"
                    name="published_date"
                    onChange={updateField}
                    class="form-control"
                    placeholder="Published Date"
                  />
                </div>
                <div class="form-group">
                  <label>pages </label>

                  <input
                    value={values.pages}
                    type="number"
                    name="pages"
                    onChange={updateField}
                    class="form-control"
                    placeholder="Pages"
                  />
                </div>
                <div class="form-group">
                  <label>Language </label>

                  <input
                    value={values.language}
                    type="text"
                    name="language"
                    onChange={updateField}
                    class="form-control"
                    placeholder="Language"
                  />
                </div>
                <div class="form-group">
                  <label>Publisher_id </label>

                  <input
                    value={values.published_id}
                    type="text"
                    name="published_id"
                    onChange={updateField}
                    class="form-control"
                    placeholder="Publisher ID"
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PutUsingHook;
