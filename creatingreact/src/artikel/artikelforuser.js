import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  IoIosCalendar,
  IoIosSearch,
  IoMdPerson,
  IoMdReturnRight,
  IoMdChatbubbles
} from "react-icons/io";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";

import "../userProfile/profile.css";

function Artikel(props) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [res, setRes] = useState("");

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
          <div key={i} className="post-content">
            <div className="post-image">
              <div>
                <center>
                  <img
                    src={artikel.img}
                    alt=""
                    class="img"
                    width="300px"
                    height="300px"
                  />
                </center>
              </div>
              <div className="post-info flex-row">
                <span>
                  <IoIosCalendar />
                  {moment(data.createdAt).format("DD/MM/YYYY")}
                </span>
                <span>
                  <IoMdPerson /> {artikel.user.name}
                </span>
                <span>
                  <IoMdChatbubbles />
                  {artikel.comments.length} comments
                </span>
              </div>
            </div>
            <div className="post-title">
              <h4>
                {artikel.id}. {artikel.judul}
              </h4>
              <p> {ReactHtmlParser(artikel.isi.substr(0, 250) + " ...")}</p>{" "}
              <br />
              <Link to={`/ambil/articles/${artikel.id}`}>
                <div className="text-center primary">
                  <i> show more </i> <IoMdReturnRight />
                </div>
              </Link>
            </div>
          </div>
        );
      }
    });
  };

  const popularpost = () => {
    return data.map((data, id) => {
      if (data.status === true && data.comments.length >= 1) {
        return (
          <div class="popular-post">
            <div class="post-content" key={id}>
              <div class="post-image">
                <div>
                  <center>
                    <img src={data.img} alt="" class="img"></img>
                  </center>
                </div>
                <div className="text-center">
                  <span>
                    &nbsp;&nbsp; <IoIosCalendar />
                    {moment(data.createdAt).format("DD/MM/YYYY")},
                    <span>
                      <IoMdChatbubbles />
                      {data.comments.length} Comments
                    </span>
                  </span>
                </div>
              </div>
              <div class="post-title">
                <a>{data.judul}</a>
              </div>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className="container">
      <div class="jumbotron">
        <h1 class="display-4 text-right">Hello, {token.token.username}!</h1>
        <p class="lead text-right">
          This is a blog to create something about physics. lets try!.
        </p>
        <hr class="my-4" />
        <Link to={"/post/articles/" + token.token.id}>
          <i className="text-primary-right">ADD ARTICLE</i> <br />
        </Link>
        <Link to={"/get/articles/" + token.token.id}>
          <i className="button">see your article </i>
        </Link>
      </div>
      <div className="site-content">
        <div className="posts">
          {showArticle()}
          <Link to={`/articles`}>
            <button className="bg-dark rounded-circle text-light  ">
              <i> 1 </i>
            </button>
          </Link>
          <Link to={`/get/articles/2`}>
            <button className="bg-dark rounded-circle text-light  ">
              <i> 2 </i>
            </button>
          </Link>
        </div>

        <div id="sidebar">
          <IoIosSearch />
          <input
            type="text"
            placeholder="search"
            value={res}
            onChange={onchange}
          />
          <h2>What is a Fun Physics? </h2>
          <p>
            Fun physics is a web to understand physics phenomenon, knowledge
            about scientist and discuss anything about physics
          </p>
          <h2> You can create article about: </h2>
          <ul>
            <li> Scientist </li>
            <li> phenomenon </li>
            <li> fun physics </li>
          </ul>
          <div class="popular-post mt-5  ">
            <h2>Popular Articles</h2>
            {popularpost()}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Artikel;
