import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [data, setData] = useState([]);

  function getData() {
    axios
      .get("https://648c40f18620b8bae7ec8cdf.mockapi.io/crudproject")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }
  const handleDelete = (id) => {
    axios
      .delete(`https://648c40f18620b8bae7ec8cdf.mockapi.io/crudproject/${id}`)
      .then(() => {
        getData();
      });
  };
  const setLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between m-3">
        <h2>Read Operations</h2>
        <Link to="/">
          <button className="btn btn-primary">Create</button>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">button</th>
          </tr>
        </thead>
        {data.map((eachData) => {
          return (
            <>
              <tbody>
                <tr>
                  <th scope="row">{eachData.id}</th>

                  <td>{eachData.name}</td>
                  <td>{eachData.email}</td>
                  <td>
                    <Link to="/update">
                      {" "}
                      <button
                        className="btn-success"
                        onClick={() => {
                          setLocalStorage(
                            eachData.id,
                            eachData.name,
                            eachData.email
                          );
                        }}
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(eachData.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
}

export default Read;
