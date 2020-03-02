import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
// import Artikel from "./artikelbyid";

function Comment(props) {
  const [data, setData] = useState([]);
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  const id = props.match.params.id;
  const urls = `http://127.0.0.1:7000/comments/` + id;
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: urls,
        headers: {
          Authorization: token.token.accessToken
        }
      });
      setData(result.data.artikel.comments);
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

  const showComment = () => {
    return data.map(data => {
      return (
        <div className="prof card ">
          <div className="card-header">
            <p> comment list on article {data.artikelId}</p>
            <p className="card-text">
              <small className="text-muted">
                someone comment with userid {data.userId}:
              </small>
              <i> {data.isi_comment}</i>
            </p>
          </div>
        </div>
      );
    });
  };
  return <tbody>{showComment()}</tbody>;
}
export default Comment;
