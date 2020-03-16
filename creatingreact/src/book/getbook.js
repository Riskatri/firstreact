import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function BookHook() {
  const [data, setData] = useState({ book: [] });

  function DeleteBook(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    axios({
      method: "delete",
      url: `http://127.0.0.1:8015/books/${id}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: data
    });
    alert("Book has been delete");
    window.location.reload(false);
  }

  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://127.0.0.1:8015/books",
        headers: {
          Authorization: token.token.accessToken
        }
      });
      setData(result.data);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
    // console.log(data);
  }, []);
  if (!token) {
    return <Redirect to="/login" />;
  }
  console.log(data);
  const renderTable = () => {
    return data.book.map((book, id) => {
      return (
        <tr key={id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.published_date}</td>
          <td>{book.pages}</td>
          <td>{book.language}</td>
          <td>{book.publisher_id}</td>
          <td>
            <Link to={"/update/books/" + book.id}>
              <button className="button bg-primary">Edit</button>
            </Link>

            <button
              className="button bg-danger"
              onClick={() => DeleteBook(book.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="container mt-5">
      <h1 id="title">List Books</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Published Date</th>
            <th>Pages</th>
            <th>Language</th>
            <th>Publisher Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}
export default BookHook;
