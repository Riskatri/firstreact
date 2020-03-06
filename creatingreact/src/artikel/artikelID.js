import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  IoIosCalendar,
  IoIosCloseCircle,
  IoMdChatbubbles
} from "react-icons/io";
import moment from "moment";
import mainLogo from "../userProfile/einstein.jpeg";

function Artikel(props) {
  const [data, setData] = useState([]);
  const [form, setValues] = useState({
    status: true,
    isi_comment: "",
    userId: "",
    artikelId: ""
  });

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

  function DeleteComment(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    axios({
      method: "delete",
      url: `http://127.0.0.1:7000/comments/${id}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: data
    });
    alert("comment has been delete");
    window.location.reload(false);
  }

  function HideComment(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    axios({
      method: "put",
      url: `http://127.0.0.1:7000/comments/${id}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: { status: false }
    });
    window.location.reload(false);
  }

  function ShowComments(id) {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    axios({
      method: "put",
      url: `http://127.0.0.1:7000/comments/${id}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: { status: true }
    });
    window.location.reload(false);
  }

  const handlerSubmit = async event => {
    event.preventDefault();
    try {
      const token = JSON.parse(
        sessionStorage.getItem("persisted_state_hook:token")
      );
      const id = token.token.id;
      const artikelId = props.match.params.id;
      const result = await axios({
        method: "post",
        url: `http://127.0.0.1:7000/comments/${id}/${artikelId}`,
        data: {
          isi_comment: form.isi_comment,
          status: true
        },
        headers: {
          Authorization: token.token.accessToken
        }
      });
      console.log(result);

      if (result.status === 201) {
        alert("comment successfully!");
      } else {
        throw new Error("Failed to comment!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  if (!token) {
    return <Redirect to="/login" />;
  }

  const showArticle = () => {
    return data.map((data, i) => {
      return (
        <div key={i} className="card">
          <div className="container text-right"></div>
          <div className="card-header bg-info">
            <h4>
              {data.id}. {data.judul}
            </h4>
          </div>
          <div className="card-body">
            <p className="card-text">
              <i> {data.isi}</i> <br></br>
              <small className="text-muted">
                <IoIosCalendar /> {moment(data.createdAt).format("DD/MM/YYYY")}:
                someone update with userid
                {token.token.id} {data.name}
              </small>
            </p>
          </div>
          <h6 className="card-header border-primary">
            {" "}
            <IoMdChatbubbles /> Comments:{" "}
          </h6>
          {showComments()}
        </div>
      );
    });
  };

  const showComments = () => {
    return data.map(({ comments }) => {
      return (
        <div className="container">
          {comments.map((comments, i) => {
            if (comments.status === true) {
              return (
                <>
                  <div key={i} className="card">
                    <div className="card-body">
                      <small className="text-muted">
                        {comments.user.name} comment :
                      </small>
                      <i> {comments.isi_comment}</i>
                      {(() => {
                        if (
                          token.token.admin === true ||
                          comments.userId === token.token.id
                        ) {
                          return (
                            <IoIosCloseCircle
                              onClick={() => DeleteComment(comments.id)}
                            />
                          );
                        }
                      })()}
                      {(() => {
                        if (
                          comments.status === true &&
                          token.token.admin === true
                        ) {
                          return (
                            <Link>
                              <small
                                className="text-primary"
                                onClick={() => HideComment(comments.id)}
                              >
                                hide
                              </small>
                            </Link>
                          );
                        } else if (
                          comments.status === false &&
                          token.token.admin === true
                        ) {
                          return (
                            <Link>
                              <small
                                className="text-primary"
                                onClick={() => ShowComments(comments.id)}
                              >
                                show
                              </small>
                            </Link>
                          );
                        }
                      })()}
                    </div>
                  </div>
                </>
              );
            } else if (token.token.admin === true) {
              return (
                <>
                  <div key={i} className="card">
                    <div className="card-body">
                      <small className="text-muted">
                        someone comments with userid {comments.userId} :
                      </small>
                      <i> {comments.isi_comment}</i>
                      {(() => {
                        if (
                          token.token.admin === true ||
                          comments.userId === token.token.id
                        ) {
                          return (
                            <IoIosCloseCircle
                              onClick={() => DeleteComment(comments.id)}
                            />
                          );
                        }
                      })()}
                      {(() => {
                        if (
                          comments.status === true &&
                          token.token.admin === true
                        ) {
                          return (
                            <Link>
                              <small
                                className="text-primary"
                                onClick={() => HideComment(comments.id)}
                              >
                                hide
                              </small>
                            </Link>
                          );
                        } else if (
                          comments.status === false &&
                          token.token.admin === true
                        ) {
                          return (
                            <Link>
                              <small
                                className="text-primary"
                                onClick={() => ShowComments(comments.id)}
                              >
                                show
                              </small>
                            </Link>
                          );
                        }
                      })()}
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      );
    });
  };
  return (
    <div className="container text-left">
      <img src={mainLogo} alt="Einstein" width="150px" className="home" />
      <i className="text-dark">
        "doing the same thing over and over again and expecting different
        results"
      </i>

      <tbody>{showArticle()}</tbody>
      <div className="home">
        <form onSubmit={handlerSubmit}>
          <textarea
            class="form-control"
            placeholder="comment"
            value={form.isi_comment}
            onChange={updateField}
            name="isi_comment"
          />

          <button type="submit" className="btn btn-primary">
            add comment
          </button>
        </form>
      </div>
    </div>
  );
}
export default Artikel;
