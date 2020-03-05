import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosCalendar, IoIosCloseCircle } from "react-icons/io";
import moment from "moment";

function Artikel(props) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [res, setRes] = useState("");

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
        url: `http://127.0.0.1:7000/articles/`,
        headers: {
          Authorization: token.token.accessToken
        },
        data: data
      });
      setData(result.data.artikel);
      setFiltered(result.data.artikel);
      // setKomen(result.data.artikel.comments);
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
      result.judul.toLowerCase().includes(res)
    );
    setData(results);
  }, [res]);

  onchange = e => {
    setRes(e.target.value);
  };

  console.log(data);
  if (!token) {
    return <Redirect to="/login" />;
  }

  console.log(data);

  const showArticle = () => {
    return data.map((artikel, i) => {
      if (artikel.status === true) {
        return (
          <div key={i} className="home card">
            <div className="container text-right">
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={() => DeleteArticle(artikel.id)}
              >
                <IoIosCloseCircle />
              </button>
            </div>
            <div className="card-header border-primary">
              <h4>
                {artikel.id}. {artikel.judul}
              </h4>
            </div>
            <div className="card-body">
              <p className="card-text">
                <i> {artikel.isi}</i> <br />
                <small className="text-muted">
                  <IoIosCalendar />{" "}
                  {moment(data.createdAt).format("DD/MM/YYYY")} : someone update
                  with userid {artikel.userId}
                </small>
              </p>
            </div>
            <Link to={`/ambil/articles/${artikel.id}`}>
              <i className="text-center primary"> show more</i>
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
      <div className="container text-left">
        <input
          type="text"
          placeholder="search"
          value={res}
          onChange={onchange}
        />
        <tbody>{showArticle()}</tbody>
      </div>
    </div>
  );
}
export default Artikel;
