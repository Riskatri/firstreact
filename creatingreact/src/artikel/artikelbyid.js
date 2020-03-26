import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { IoIosCalendar, IoMdChatbubbles } from "react-icons/io";
import moment from "moment";

function Artikel(props) {
  const [data, setData] = useState([]);
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  const artikelId = props.match.params.artikelId;
  const urls = `http://127.0.0.1:7000/articles/` + artikelId;
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

  // const showArticle = () => {
  //   return data.map(data => {
  //     if (data.status === true) {
  //       return (
  //         <div className="card">
  //           <div className="container text-right border-primary"></div>
  //           <div className="card-header ">
  //             <h4>
  //               {data.id}. {data.judul}
  //               <img
  //                 src={data.img}
  //                 alt=""
  //                 class="img"
  //                 width="1000px"
  //                 height="400px"
  //               />
  //             </h4>
  //           </div>
  //           <div className="card-body">
  //             <p className="card-text">
  //               <i> {data.isi}</i> <br></br>
  //               <small className="text-muted">
  //                 {moment(data.createdAt).format("DD/MM/YYYY")}: someone update
  //                 with userid {token.token.id}
  //               </small>
  //             </p>
  //           </div>
  //         </div>
  //       );
  //     }
  //   });
  // };

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
                {moment(data.createdAt).format("DD/MM/YYYY")}
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
            <p> {artikel.isi}</p> <br />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container text-left">
      <tbody>{showArticle()}</tbody>
    </div>
  );
}
export default Artikel;
