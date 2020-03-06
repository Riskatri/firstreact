import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosCalendar, IoIosSearch } from "react-icons/io";
import moment from "moment";
import mainLogo from "../userProfile/lovephysics.jpeg";

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
          <div className="row">
            <img
              src={mainLogo}
              alt="Einstein"
              width="200px"
              className="home rounded-circle "
            />

            <div key={i} className="col-8">
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
                    {moment(data.createdAt).format("DD/MM/YYYY")} <br />
                    {artikel.user.name} update
                  </small>
                </p>
              </div>
              <Link to={`/ambil/articles/${artikel.id}`}>
                <div className="text-center primary">
                  <i> show more</i>
                </div>
              </Link>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className="container text-right">
      <div class="jumbotron">
        <h1 class="display-4">Hello, {token.token.username}</h1>
        <p class="lead">
          This is a blog to create something about physics. lets try!.
        </p>
        <hr class="my-4" />
        <Link to={"/post/articles/" + token.token.id}>
          <i className="text-primary">ADD ARTICLE</i>
        </Link>
      </div>

      <Link to={"/get/articles/" + token.token.id}>
        <button className="button">see your article</button>
      </Link>
      <div className="container text-left">
        <IoIosSearch />
        <input
          type="text"
          placeholder="search"
          value={res}
          onChange={onchange}
          className="home"
        />
        <tbody>{showArticle()}</tbody>
      </div>
    </div>
  );
}
export default Artikel;
