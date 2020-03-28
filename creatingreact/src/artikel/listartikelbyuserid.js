import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { IoIosCalendar } from "react-icons/io";

function Artikel(props) {
  const [data, setData] = useState([]);

  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  const id = token.token.id;
  const urls = `http://127.0.0.1:7000/articles/` + id;
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
    return data.map((artikel, i) => {
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
            <div className="post-info2 flex-row">
              <span>
                <IoIosCalendar />
                {moment(artikel.createdAt).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
          <div className="post-title">
            <h4>
              {artikel.id}. {artikel.judul}
            </h4>
            <p> {artikel.isi}</p> <br />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container text-justify">
      <tbody>{showArticle()}</tbody>
    </div>
  );
}
export default Artikel;
