import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function User() {
  const [data, setData] = useState({ user: [] });
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/users",
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
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>
            <Link to={"/orders/" + user.id}>
              <button className="button muted-button">Orderan</button>
            </Link>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="container px 5">
      <h3 id="title">Daftar Pengunjung</h3>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}
export default User;
