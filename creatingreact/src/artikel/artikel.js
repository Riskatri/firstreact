import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function User() {
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
  if (!token) {
    return <Redirect to="/login" />;
  }

  console.log(data);

  const showArticle = () => {
    return data.artikel.map(artikel => {
      return (
        <div className="card">
          <div class="card-header">
            <h4>
              {artikel.id}. {artikel.judul}
            </h4>
          </div>
          <div class="card-body">
            <p class="card-text">
              <i> {artikel.isi}</i>
            </p>
            <p class="card-text">
              <small class="text-muted">
                someone update with userid {artikel.userId}
              </small>
            </p>
          </div>
        </div>
      );
    });
  };

  return <tbody>{showArticle()}</tbody>;

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
