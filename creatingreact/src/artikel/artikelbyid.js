import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function Artikel(props) {
  const [data, setData] = useState([]);
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  const artikelId = props.match.params.artikelId;
  const urls = `http://127.0.0.1:7000/articles/` + artikelId;
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: urls,
        headers: {
          Authorization: token.token.accessToken
        }
      });
      setData(result.data.user.artikels);
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
    return data.map(data => {
      return (
        <div className="card">
          <div className="container text-right"></div>
          <div className="card-header">
            <h4>
              {data.id}. {data.judul}
            </h4>
          </div>
          <div className="card-body">
            <p className="card-text">
              <i> {data.isi}</i>
            </p>

            <p className="card-text">
              <small className="text-muted">
                someone update with userid {token.token.id}
              </small>
            </p>
          </div>
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
