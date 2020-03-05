import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function Artikel(props) {
  const [data, setData] = useState([]);
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  const id = props.match.params.id;
  const urls = `http://127.0.0.1:7000/get/articles/` + id;
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: urls,
        headers: {
          Authorization: token.token.accessToken
        }
      });
      setData(result.data.artikel);
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

  //   console.log(data);

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
              <i> {data.isi}</i> <br></br>
              <small className="text-muted">
                {data.createdAt}: someone update with userid {token.token.id}
              </small>
            </p>
          </div>

          <tbody>
            <h6 className="card-header border-primary"> Comments: </h6>
            {showComments()}
          </tbody>
          <Link to={`/post/comments/${token.token.id}/${data.id}`}>
            <div className="text-center"> +comments</div>
          </Link>
        </div>
      );
    });
  };

  const showComments = () => {
    return data.map(({ comments }) => {
      // if (comments.status === true) {
      return (
        <div className="container">
          {comments.map(komen => {
            return (
              <div className="card">
                <div className="card-body">
                  <small className="text-muted">
                    someone comments with userid {komen.userId} :
                  </small>
                  <i> {komen.isi_comment}</i>
                </div>
              </div>
            );
          })}
        </div>
      );
      // }
    });
  };
  return (
    <div className="container text-left">
      <tbody>{showArticle()}</tbody>
    </div>
  );
}
export default Artikel;
