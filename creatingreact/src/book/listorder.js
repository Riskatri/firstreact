import React, { useState, useMemo } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function OrderHook(props) {
  const [data, setData] = useState([]);
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  const id = token.token.id;
  const urls = `http://127.0.0.1:8015/orders/` + id;
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: urls,
        headers: {
          Authorization: token.token.accessToken
        }
      });
      setData(result.data.user.books);
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

  const renderTable = () => {
    return data.map((data, id) => {
      return (
        <tr key={id}>
          <td>{data.title}</td>
          <td>{data.author}</td>
          <td>{data.published_date}</td>
          <td>{data.pages}</td>
          <td>{data.language}</td>
          <td>{data.publisher_id}</td>
        </tr>
      );
    });
  };
  return (
    <div className="container mt-5">
      <h1 id="title">List order</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published Date</th>
            <th>Pages</th>
            <th>Language</th>
            <th>Publisher Id</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}
export default OrderHook;
