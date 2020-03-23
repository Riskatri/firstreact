import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  IoIosCalendar,
  IoIosCloseCircle,
  IoIosSearch,
  IoMdPerson,
  IoMdReturnRight
} from "react-icons/io";
import moment from "moment";

import "../userProfile/profile.css";

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
          <div key={i} className=" col-11">
            <div className="container text-right">
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you wish to delete this article?"
                    )
                  )
                    DeleteArticle(artikel.id);
                }}
              >
                <IoIosCloseCircle />
              </button>
            </div>

            <div className="card-header border-primary">
              <h4>
                {artikel.id}. {artikel.judul}
              </h4>
              <img
                src={artikel.img}
                alt=""
                class="img"
                width="600px"
                height="300px"
              />
              <div className="post-content">
                <h7>
                  <IoIosCalendar />
                  {moment(data.createdAt).format("DD/MM/YYYY")} |
                  <IoMdPerson /> {artikel.user.name} update with userid
                  {artikel.userId}
                </h7>
              </div>
            </div>

            <div className="card-body">
              <p className="card-text-center">
                <i> {artikel.isi.substr(0, 250) + " ..."}</i> <br />
              </p>
            </div>
            <Link to={`/ambil/articles/${artikel.id}`}>
              <div className="text-center primary">
                <i> show more </i> <IoMdReturnRight />
              </div>
            </Link>
          </div>
        );
      }
    });
  };

  return (
    <div className="container text-right">
      <div class="jumbotron">
        <h1 class="display-4">Hello, {token.token.username}!</h1>
        <p class="lead">
          This is a blog to create something about physics. lets try!.
        </p>
        <hr class="my-4" />
        <Link to={"/post/articles/" + token.token.id}>
          <i className="text-primary">ADD ARTICLE</i>
        </Link>
      </div>
      <div className="container text-left">
        <IoIosSearch />
        <input
          type="text"
          placeholder="search"
          value={res}
          onChange={onchange}
        />
        <div id="sidebar">
          <h2>What is an All About Physics? </h2>
          <p>
            all about physics is a web to understand physics phenomenon,and
            knowledge about scientist{" "}
          </p>
          <h2> artikel berdasarkan kategori </h2>
          <ul>
            <li> Scientist </li>
            <li> phenomenon </li>
            <li> fun physics </li>
          </ul>
        </div>
        <tbody>{showArticle()}</tbody>
      </div>
    </div>
  );
}
export default Artikel;
