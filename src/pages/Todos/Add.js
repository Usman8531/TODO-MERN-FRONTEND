import axios from "axios";
import React, { useState } from "react";

const initialValue = {
  title: "",
  location: "",
  description: "",
};
function Add() {
  const [formData, setFormData] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const PORT = "http://localhost:8000";

  const handleSubmit = (e) => {
    e.preventDefault();
    let { title, location, description } = formData;
    title = title.trim();
    location = location.trim();
    description = description.trim();
    if (
      !title ||
      title.length < 3 ||
      !location ||
      location.length < 3 ||
      !description ||
      description.length < 10
    ) {
      return window.showToast("error", "Fill the inputs correctly!");
    } else {
      let todo = {
        title,
        location,
        description,
        // status: "active",
        createdAt: new Date().getTime(),
      };
      axios
        .post(`${PORT}/createTodo`, todo)
        .then((res) => {
          console.log("res", res);
        })
        .catch((error) => {
          console.log("error", error);
        });

      console.log("formData", todo);
      setFormData(initialValue);
      return window.showToast("success", "oo yeah!");
    }
  };
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center">Add Todo</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            className="card p-3 p-md-4 mx-auto my-3 shadow"
            style={{ maxWidth: "500px" }}
          >
            <div className="row ">
              <div className="col-12 col-md-6 mb-3 ">
                <input
                  type="text"
                  placeholder="title"
                  name="title"
                  value={formData.title}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="location"
                  name="location"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.location}
                />
              </div>
              <div className="col-12 mb-3">
                <textarea
                  name="description"
                  id=""
                  className="form-control"
                  cols="30"
                  rows="3"
                  placeholder="description"
                  onChange={handleChange}
                  value={formData.description}
                ></textarea>
              </div>
              <div className="col-12 col-md-6 offset-md-3 mb-3 text-center">
                <button className="btn btn-primary">Add Todo</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;
