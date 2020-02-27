import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function BookHook() {
  const [data, setData] = useState({ book: [] });
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  async function getOrder(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    try {
      await axios({
        method: "post",
        url: `http://127.0.0.1:8000/orders/${id}`,
        headers: {
          Authorization: token.token.accessToken
        },
        data: {
          userId: token.token.id,
          bookId: id
        }
      });
    } catch (err) {
      console.log(err);
    }
    alert("Order Successfuly");
    // window.location.reload(false);
  }
  console.log(data);
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
            <button
              className="button bg-primary"
              onClick={() => getOrder(book.id)}
            >
              Order buku
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
            <th>Title</th>
            <th>Author</th>
            <th>Published Date</th>
            <th>Pages</th>
            <th>Language</th>
            <th>Publisher_id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}
export default BookHook;
