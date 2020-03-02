import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function Artikel() {
  const [data, setData] = useState({ artikel: [] });
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://127.0.0.1:7000/comments",
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
        <div className="card-body">
          <p className="card-text">
            <i>
              {artikel.komentar.id}. {artikel.komentar.isi_comment}
            </i>
          </p>
          <p className="card-text">
            <small className="text-muted">
              someone comment with userid {artikel.userId}
            </small>
          </p>
        </div>
      );
    });
  };

  return (
    <div className="container text-left">
      <tbody>{showArticle()}</tbody>
    </div>
  );
}
export default Artikel;
