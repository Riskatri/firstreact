import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { IoIosCalendar, IoIosSearch, IoIosShareAlt } from "react-icons/io";
import moment from "moment";

function Artikel() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [res, setRes] = useState("");

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://127.0.0.1:7000/guess/articles",
        data: data
      });

      setData(result.data.artikel);
      setFiltered(result.data.artikel);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
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

  const showArticle = () => {
    return data.map((data, i) => {
      if (data.status === true) {
        return (
          <div key={i} className="jumbotron">
            <div className="container text-right"></div>
            <div className="display-4">
              <h4>
                {data.id}. {data.judul}
              </h4>
            </div>
            <hr />

            <p className="my-4">
              <i> {data.isi}</i>
            </p>
            <p className="my-4">
              <small className="text-muted">
                <IoIosCalendar /> {moment(data.createdAt).format("DD/MM/YYYY")}:{" "}
                {data.user.name} update with userid {data.userId}{" "}
                <IoIosShareAlt />
              </small>
            </p>
          </div>
        );
      }
    });
  };

  return (
    <div className="text-left">
      <IoIosSearch />
      <input type="text" placeholder="search" value={res} onChange={onchange} />
      <tbody>{showArticle()}</tbody>
    </div>
  );
}
export default Artikel;
