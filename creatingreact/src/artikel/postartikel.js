// import React from "react";
// import axios from "axios";
// import "../userProfile/profile.css";

// class PostArtikel extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       judul: "",
//       isi: "",
//       userId: "",
//       status: true
//     };
//   }

//   handlerChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   handlerSubmit = async event => {
//     event.preventDefault();
//     try {
//       const token = JSON.parse(
//         sessionStorage.getItem("persisted_state_hook:token")
//       );
//       const id = this.props.match.params.id;
//       const result = await axios({
//         method: "post",
//         url: "http://127.0.0.1:7000/articles/" + id,
//         data: this.state,
//         headers: {
//           Authorization: token.token.accessToken
//         }
//       });
//       console.log(result);

//       if (result.status === 201) {
//         alert("Data inserted sucessfuly!");
//         window.location.reload("/");
//       } else {
//         throw new Error("Failed to insert data!");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   render() {
//     return (
//       <div className="container mt-5">
//         <form onSubmit={this.handlerSubmit}>
//           <div className="input-group">
//             <div className="input-group-prepend">
//               <span class="input-group-text" id="inputGroup-sizing-sm">
//                 title
//               </span>
//             </div>
//             <input
//               className="form-control"
//               aria-label="small"
//               value={this.state.judul}
//               type="text"
//               name="judul"
//               onChange={this.handlerChange}
//               placeholder="title"
//             />
//           </div>
//           <br></br>
//           <div className="input-group">
//             <div className="input-group-prepend">
//               <span className="input-group-text">articles</span>
//             </div>

//             <textarea
//               className="form-control"
//               value={this.state.isi}
//               onChange={this.handlerChange}
//               name="isi"
//               placeholder="articles"
//             ></textarea>
//           </div>
//           <br></br>
//           <button type="submit" className="btn btn-dark">
//             Submit
//           </button>
//         </form>
//       </div>
//     );
//   }
// }
// export default PostArtikel;

import React, { useState } from "react";
import axios from "axios";
import { FormGroup } from "reactstrap";

function PostUsingHook(props) {
  const [form, setValues] = useState({
    judul: "",
    isi: "",
    userId: "",
    status: true,
    img: "",
    file1: "",
    title: "",
    preview: null
  });

  const [result, setResult] = useState({ status: true, url: "" });

  const urlimag = result.url;
  console.log(urlimag);

  const handleSubmit = async e => {
    e.preventDefault();
    if (result.url !== "") {
      try {
        const token = JSON.parse(
          sessionStorage.getItem("persisted_state_hook:token")
        );
        const id = props.match.params.id;
        const result = await axios({
          method: "post",
          url: "http://127.0.0.1:7000/articles/" + id,
          data: {
            judul: form.judul,
            isi: form.isi,
            status: true,
            img: "http://127.0.0.1:7000/" + urlimag
          },
          headers: {
            Authorization: token.token.accessToken
          }
        });
        console.log(result);

        if (result.status === 201) {
          alert("Data inserted sucessfuly!");
          window.location.reload("/");
        } else {
          throw new Error("Failed to insert data!");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Anda Harus Submit Gambar Terlebih Dahulu");
    }
  };

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updateFile = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0])
    });
  };

  const handlerSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    if (form.file1 !== "" && form.title !== "") {
      data.append("title", form.title);
      data.append("file", form.file1);
      try {
        const result = await axios.post("http://localhost:7000/upload", data);
        setResult(result.data);
      } catch (err) {
        setResult(result.status);
        // console.log(err);
      }
    } else {
      alert("Please fill all the required field");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">
              title
            </span>
          </div>
          <input
            className="form-control"
            aria-label="small"
            value={form.judul}
            type="text"
            name="judul"
            onChange={updateField}
            placeholder="title"
          />
        </div>
        <br></br>
        {/* <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">articles</span>
          </div>

          <textarea
            className="form-control"
            value={form.isi}
            onChange={updateField}
            name="isi"
            placeholder="articles"
          ></textarea> */}

        <div class="form-group">
          <label for="isi">Artciles</label>
          <textarea
            name="isi"
            value={form.isi}
            class="form-control"
            rows="15"
            onChange={updateField}
          ></textarea>
        </div>
        {/* </div> */}

        <form onSubmit={handlerSubmit}>
          <FormGroup>
            <label htmlFor="title">Title image</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              onChange={updateField}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="file1">File Image</label>
            <input
              type="file"
              id="file1"
              name="file1"
              className="form-control-file"
              onChange={updateFile}
            />
          </FormGroup>
          <button className="btn btn-outline-info">Submit image</button>
        </form>
        <div className="col-md-6">
          <h5>Image Preview Before Upload</h5>
          {form.file1 !== "" ? <img src={form.preview} alt="profile" /> : ""}
        </div>
        <div className="col-md-6 mt-2">
          <h5>Image from server</h5>
          {result.url !== "" ? (
            <div>
              <h5>Image:</h5>
              <img src={`http://localhost:7000/${result.url}`} alt="profile" />
              <h5>Title: {result.title}</h5>
            </div>
          ) : (
            ""
          )}
        </div>
        <br></br>

        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostUsingHook;
