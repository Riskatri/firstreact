import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function Artikel() {
  const [data, setData] = useState([]);

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

  // const handleChange = event => {
  //   setSearchTerm(event.target.value);
  // }

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
      setData(result.data.artikel); //
      // const results = artikel.filter(artikel => artikel.toLowerCase().includes(searchTerm))
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
    return data.map(artikel => {
      if (artikel.status === true) {
        return (
          <div className="home card">
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
                <i> {artikel.isi}</i> <br />
                <small className="text-muted">
                  {artikel.createdAt}: someone update with userid
                  {artikel.userId}
                </small>
              </p>
            </div>

            <Link to={`/get/comments/${artikel.id}`}>
              <button className="button bg-primary"> show comments</button>
            </Link>
          </div>
        );
      }
    });
  };

  return (
    <div className="container text-right">
      <Link to={"/post/articles/" + token.token.id}>
        <button className="button bg-secondary">+ articles</button>
      </Link>
      <div className="container text-left">
        <tbody>{showArticle()}</tbody>
      </div>
    </div>
  );
}
export default Artikel;
