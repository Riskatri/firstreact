import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function Artikel() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [result, setResult] = useState("");

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
      setData(result.data.artikel);
      setFiltered(result.data);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
    // console.log(data);
  }, []);
  useEffect(() => {
    const results = filtered.filter(result =>
      result.judul.toLowerCase().includes(result)
    );
    setData(results);
  }, [result]);

  const onChange = e => {
    setResult(e.target.value);
  };

  if (!token) {
    return <Redirect to="/login" />;
  }

  console.log(data);

  const showArticle = () => {
    return data.map(data => {
      return (
        <div className="home card">
          <div className="container text-right"></div>
          <div className="card-header bg-secondary">
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
                someone update with userid {data.userId}
              </small>
            </p>
            <Link to={`/post/comments/${token.token.id}/${data.id}`}>
              <button className="button bg-secondary">comments</button>
            </Link>
            <Link to={`/get/comments/${data.id}`}>
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
        <input
          type="text"
          placeholder="search"
          value={result}
          onChange={onChange}
        />
        <tbody>{showArticle()}</tbody>
      </div>
    </div>
  );
}
export default Artikel;
