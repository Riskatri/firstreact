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
          <div className="container text-right"></div>
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
            <Link to={`/post/comments/${token.token.id}/${artikel.id}`}>
              <button className="button bg-secondary">comments</button>
            </Link>
            <Link to={`/get/comments`}>
              <button className="button bg-secondary"> show comments</button>
            </Link>
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
      <Link to={"/get/articles/" + token.token.id}>
        <button className="button bg-secondary">see your article</button>
      </Link>
      <div className="container text-left">
        <tbody>{showArticle()}</tbody>
      </div>
    </div>
  );
}
export default Artikel;
