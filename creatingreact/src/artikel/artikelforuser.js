import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function Artikel(props) {
  const [data, setData] = useState([]);

  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: `http://127.0.0.1:7000/articles/`,
        headers: {
          Authorization: token.token.accessToken
        },
        data: data
      });
      setData(result.data.artikel);
      // setKomen(result.data.artikel.comments);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
    // console.log(data);
  }, []);
  console.log(data);
  if (!token) {
    return <Redirect to="/login" />;
  }

  console.log(data);

  const showArticle = () => {
    return data.map(artikel => {
      if (artikel.status === true) {
        return (
          <div className="home card">
            <div className="container text-right"></div>
            <div className="card-header border-primary">
              <h4>
                {artikel.id}. {artikel.judul}
              </h4>
            </div>
            <div className="card-body">
              <p className="card-text">
                <i> {artikel.isi}</i> <br />
                <small className="text-muted">
                  {artikel.createdAt} : someone update with userid{" "}
                  {artikel.userId}
                </small>
              </p>
            </div>
            <Link to={`/ambil/articles/${artikel.id}`}>
              <button className="button bg-primary"> show more</button>
            </Link>
          </div>
        );
      }
    });
  };

  return (
    <div className="container text-right">
      <Link to={"/post/articles/" + token.token.id}>
        <button className="button">+ articles</button>
      </Link>
      <Link to={"/get/articles/" + token.token.id}>
        <button className="button">see your article</button>
      </Link>
      <div className="container text-left">
        <tbody>{showArticle()}</tbody>
      </div>
    </div>
  );
}
export default Artikel;
