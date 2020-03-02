import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

function Artikel() {
  const [data, setData] = useState({ artikel: [] });
  const [filtered, setFiltered] = useState([]);
  const [result, setResult] = useState("");

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://127.0.0.1:7000/articles",
        data: data
      });
      setData(result.data);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);

  useEffect(() => {
    const results = filtered.filter(res =>
      res.artikel.toLowerCase().includes(result)
    );
    setData(results);
  }, [result]);

  const onChange = e => {
    setResult(e.target.value);
  };
  console.log(data);

  const showArticle = () => {
    return data.artikel.map(artikel => {
      return (
        <div className="card">
          <div className="container text-right"></div>
          <div className="card-header">
            <h4>
              {artikel.id}. {artikel.judul}
            </h4>
          </div>
          <div className="card-body">
            <p className="card-text">
              <i> {artikel.isi}</i>
            </p>

            <p className="card-text">
              <small className="text-muted">
                someone update with userid {artikel.userId}
              </small>
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container text-left">
      <input
        type="text"
        placeholder="search"
        value={result}
        onChange={onChange}
      />
      <tbody>{showArticle()}</tbody>
    </div>
  );
}
export default Artikel;
