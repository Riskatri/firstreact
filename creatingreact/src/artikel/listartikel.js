import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosHammer } from "react-icons/io";

function Article() {
  const [data, setData] = useState({ artikel: [] });
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://127.0.0.1:7000/articles",
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

  function HideArticle(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    axios({
      method: "put",
      url: `http://127.0.0.1:7000/articles/${id}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: { status: false }
    });
    window.location.reload(false);
  }

  function ShowArticle(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    axios({
      method: "put",
      url: `http://127.0.0.1:7000/articles/${id}`,
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
    return data.artikel.map((artikel, id) => {
      return (
        <tr key={id}>
          <td>{artikel.id}</td>
          <td>{artikel.judul}</td>
          <td>{artikel.isi}</td>
          <td>{artikel.userId}</td>
          <td>
            {artikel.admin}
            {(() => {
              if (artikel.admin === true) {
                return <p> Admin </p>;
              } else {
                return <p> user </p>;
              }
            })()}
          </td>
          <td>
            {artikel.status}
            {(() => {
              if (artikel.status === true) {
                return (
                  <button
                    className="btn bg-primary btn-sm"
                    onClick={() => HideArticle(artikel.id)}
                  >
                    hide
                  </button>
                );
              } else if (artikel.status === false) {
                return (
                  <button
                    className="btn bg-danger btn-sm"
                    onClick={() => ShowArticle(artikel.id)}
                  >
                    show
                  </button>
                );
              }
            })()}
          </td>
          <td>
            <Link to={"/update/articles/" + artikel.id}>
              <IoIosHammer />
            </Link>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <h3 className="title bg-light">List Articles</h3>
      <div>
        <table className="table table-striped table-dark">
          <tr>
            <th>ID</th>
            <th>judul</th>
            <th>isi</th>
            <th>user id</th>
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
export default Article;
