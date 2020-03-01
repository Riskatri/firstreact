import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function User() {
  const [data, setData] = useState({ artikel: [] });
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  function DeleteArticle(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    axios({
      method: "delete",
      url: `http://127.0.0.1:7000/articles/${id}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: data
    });
    alert("article has been delete");
    window.location.reload(false);
  }

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
  if (!token) {
    return <Redirect to="/login" />;
  }

  console.log(data);

  const showArticle = () => {
    return data.artikel.map(artikel => {
      return (
        <div className="card">
          <div className="container text-right">
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => DeleteArticle(artikel.id)}
            >
              x
            </button>
          </div>
          <div className="card-header">
            <h4>
              {artikel.id}. {artikel.judul}
            </h4>
          </div>
          <div className="card-body">
            <p className="card-text">
              <i> {artikel.isi}</i>
            </p>

            <p className="card-text">
              <small className="text-muted">
                someone update with userid {artikel.userId}
              </small>
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container text-right">
      <Link to={"/post/articles/" + token.token.id}>
        <button className="button bg-secondary">+ articles</button>
      </Link>
      <div className="container text-left">
        <tbody>{showArticle()}</tbody>;
      </div>
    </div>
  );

  //   const renderTable = () => {
  //     return data.artikel.map((artikel, id) => {
  //       return (
  //         <tr key={id}>
  //           <td>{artikel.id}</td>
  //           <td>{artikel.judul}</td>
  //           <td>{artikel.isi}</td>
  //         </tr>
  //       );
  //     });
  //   };
  //   return (
  //     <div>
  //       <h3 id="title">Daftar artikel</h3>
  //       <div className="container">
  //         <table className="table table-striped table-dark">
  //           <tr>
  //             <th>ID</th>
  //             <th>Judul</th>
  //             <th>Isi</th>
  //           </tr>

  //           <tbody>{renderTable()}</tbody>
  //         </table>
  //       </div>
  //     </div>
  //   );
}
export default User;
