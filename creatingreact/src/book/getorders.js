import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function BookHook() {
  const [data, setData] = useState({ user: [] });
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  useMemo(() => {
    const fetchData = async id => {
      //   const id = this.props.match.params.id;
      const result = await axios({
        method: "get",
        url: `http://127.0.0.1:8000/orders/${id}`,
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
    return data.user.map(user => {
      return (
        <tr>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.books.title}</td>
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
            <th>name</th>
            <th>username</th>
            <th>email</th>
            <th>book</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}
export default BookHook;
