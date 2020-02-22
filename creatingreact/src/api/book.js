import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  async function DeleteBook(id) {
    await axios.delete(`http://127.0.0.1:4000/books/${id}`);
    window.location.reload(false);
  }
  const url = "http://127.0.0.1:4000/books";
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    axios.get(url).then(json => setData(json.data));
  }, []);
  console.log(data);
  const renderTable = () => {
    return data.data.map(book => {
      return (
        <tr>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.published_date}</td>
          <td>{book.pages}</td>
          <td>{book.language}</td>
          <td>{book.published_id}</td>
          <td>
            <Link to={"/update/books/" + book.id}>
              <button className="button muted-button">Edit</button>
            </Link>
            {/* <Link to={"/delete/books/" + book.id}> */}
            <button
              className="button muted-button"
              onClick={() => DeleteBook(book.id)}
            >
              Delete
            </button>
            {/* </Link> */}
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="container">
      <h1 id="title">List Books</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>title</th>
            <th>author</th>
            <th>published_date</th>
            <th>pages</th>
            <th>language</th>
            <th>published_id</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}
export default App;
