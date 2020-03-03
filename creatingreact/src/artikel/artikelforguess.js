import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

function Artikel() {
  const [data, setData] = useState([]);

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://127.0.0.1:7000/guess/articles",
        data: data
      });

      setData(result.data.artikel);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);

  console.log(data);

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
              <i> {data.isi}</i>
            </p>
            <p className="card-text">
              <small className="text-muted">
                someone update with userid {data.userId}
              </small>
            </p>
          </div>
        </div>
      );
    });
  };

  return <tbody>{showArticle()}</tbody>;
}
export default Artikel;
