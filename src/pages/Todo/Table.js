import axios from "axios";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { server } from "../../index";
function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [selectedTodo, setSelectedTodo] = useState({});
  // const PORT = "http://localhost:8000";

  const showModal = (todo) => {
    setOpen(true);
    setSelectedTodo(todo);
  };

  const handleOk = () => {
    setModalText("Updating data");
    setConfirmLoading(true);

    // Update the selected todo
    const updatedTodo = {
      ...selectedTodo,
    };

    // Update the corresponding todo item in the state
    const updatedDocuments = documents.map((doc) =>
      doc._id === updatedTodo._id ? updatedTodo : doc
    );
    setDocuments(updatedDocuments);

    axios
      .post(`${server}/todo/update/${selectedTodo._id}`, selectedTodo)
      .then((res) => {
        console.log("res", res);
        setOpen(false);
        setConfirmLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setOpen(false);
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${server}/todo/read`)
      .then((res) => {
        const { data } = res;
        setDocuments(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [documents]);

  const handleDelete = (todo) => {
    console.log("todo", todo);
    axios
      .delete(`${server}/todo/${todo._id}`)
      .then((res) => {
        const updatedDocuments = documents.filter(
          (doc) => doc._id !== todo._id
        );
        setDocuments(updatedDocuments);
        console.log("res", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleEdit = (todo) => {
    showModal(todo);
  };

  return (
    <>
      <div className="py-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="text-center">Todo</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="table table-striped table-bordered table-hover table-responsive shadow ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Location</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((todo, index) => {
                    return (
                      <tr key={index + 1}>
                        <th scope="row">{index + 1}</th>
                        <td>{todo.title}</td>
                        <td>{todo.location}</td>
                        <td>{todo.description}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(todo)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEdit(todo)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* modal  */}
      {selectedTodo && (
        <Modal
          title="Edit Todo"
          visible={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText="Save"
          cancelText="Cancel"
        >
          <form>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={selectedTodo.title}
                onChange={(e) =>
                  setSelectedTodo({
                    ...selectedTodo,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                className="form-control"
                id="location"
                value={selectedTodo.location}
                onChange={(e) =>
                  setSelectedTodo({
                    ...selectedTodo,
                    location: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={selectedTodo.description}
                onChange={(e) =>
                  setSelectedTodo({
                    ...selectedTodo,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default Table;
