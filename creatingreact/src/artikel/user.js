import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosHammer } from "react-icons/io";

function User() {
  const [data, setData] = useState({ user: [] });
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://127.0.0.1:7000/users",
        headers: {
          Authorization: token.token.accessToken
        },
        data: data
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

  function Blockuser(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    axios({
      method: "put",
      url: `http://127.0.0.1:7000/users/${id}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: { status: false }
    });
    window.location.reload(false);
  }

  function Activeuser(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    axios({
      method: "put",
      url: `http://127.0.0.1:7000/users/${id}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: { status: true }
    });
    window.location.reload(false);
  }

  if (!token) {
    return <Redirect to="/login" />;
  }

  console.log(data);
  const renderTable = () => {
    return data.user.map((user, id) => {
      return (
        <tr key={id}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>
            {user.admin}
            {(() => {
              if (user.admin === true) {
                return <p> Admin </p>;
              } else {
                return <p> user </p>;
              }
            })()}
          </td>
          <td>
            {user.status}
            {(() => {
              if (user.status === true) {
                return (
                  <button
                    className="btn bg-primary btn-sm"
                    onClick={() => Blockuser(user.id)}
                  >
                    block
                  </button>
                );
              } else if (user.status === false) {
                return (
                  <button
                    className="btn bg-danger btn-sm"
                    onClick={() => Activeuser(user.id)}
                  >
                    active
                  </button>
                );
              }
            })()}
          </td>
          <td>
            <Link to={"/update/users/" + user.id}>
              {/* <button className="button bg-primary"> */}
              <IoIosHammer />
              {/* </button> */}
            </Link>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <h3 className="container title bg-light">List user </h3>
      <div>
        <table className="container table table-striped table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>admin</th>
            <th>status</th>
            <th>Action</th>
          </tr>

          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
}
export default User;
