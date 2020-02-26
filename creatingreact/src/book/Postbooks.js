import React from "react";
import axios from "axios";
import "../userProfile/profile.css";

class PostBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      author: "",
      published_date: "",
      pages: "",
      language: "",
      publisher_id: ""
    };
  }

  handlerChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlerSubmit = async event => {
    event.preventDefault();
    try {
      const token = JSON.parse(
        sessionStorage.getItem("persisted_state_hook:token")
      );
      const result = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/books",
        data: this.state,
        headers: {
          Authorization: token.token.accessToken
        }
      });
      console.log(result);

      if (result.status === 201) {
        alert("Data inserted sucessfuly!");
      } else {
        throw new Error("Failed to insert data!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <div className="prof">
          <div className="container mt-5">
            <div class="card-header bg-secondary">
              <div class="card-header bg-dark text-white">Insert Book</div>
              <div class="card-body">
                <form onSubmit={this.handlerSubmit}>
                  <div class="form-group">
                    <label>Book Title </label>
                    <input
                      value={this.state.title}
                      type="text"
                      name="title"
                      onChange={this.handlerChange}
                      class="form-control"
                      placeholder="Book Title"
                    />
                  </div>
                  <div class="form-group">
                    <label>Author </label>

                    <input
                      value={this.state.author}
                      type="text"
                      name="author"
                      onChange={this.handlerChange}
                      class="form-control"
                      placeholder="Author"
                    />
                  </div>
                  <div class="form-group">
                    <label>published_date </label>

                    <input
                      value={this.state.published_date}
                      type="date"
                      name="published_date"
                      onChange={this.handlerChange}
                      class="form-control"
                      placeholder="Published Date"
                    />
                  </div>
                  <div class="form-group">
                    <label>pages </label>

                    <input
                      value={this.state.pages}
                      type="number"
                      name="pages"
                      onChange={this.handlerChange}
                      class="form-control"
                      placeholder="Pages"
                    />
                  </div>
                  <div class="form-group">
                    <label>Language </label>

                    <input
                      value={this.state.language}
                      type="text"
                      name="language"
                      onChange={this.handlerChange}
                      class="form-control"
                      placeholder="Language"
                    />
                  </div>
                  <div class="form-group">
                    <label>Publisher_id </label>

                    <input
                      value={this.state.publisher_id}
                      type="text"
                      name="publisher_id"
                      onChange={this.handlerChange}
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
}
export default PostBook;
