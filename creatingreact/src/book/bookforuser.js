import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function BookHook() {
  const [data, setData] = useState({ book: [] });
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  function getOrder(id) {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/orders/${id}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: {
        userId: id,
        bookId: id
      }
    });
    alert("Order Successfuly");
    // window.location.reload(false);
  }
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/books",
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
    return data.book.map(book => {
      return (
        <tr>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.published_date}</td>
          <td>{book.pages}</td>
          <td>{book.language}</td>
          <td>{book.publisher_id}</td>
          <td>
            <button
              className="button muted-button"
              onClick={() => getOrder(book.id)}
            >
              Order
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
            <th>id</th>
            <th>title</th>
            <th>author</th>
            <th>published_date</th>
            <th>pages</th>
            <th>language</th>
            <th>publisher_id</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}
export default BookHook;
