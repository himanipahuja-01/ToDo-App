import React, { useState, useContext } from "react";
import TodoContext from "../context/TodoContext";
import RecentTask from "./RecentTask";
import Task from "./Task";

function CreateTask(props) {
  const { addTask, message , userState} = useContext(TodoContext);

  const [data, setData] = useState({
    id: "",
    title: "",
    description: "",
    reminder: "",
  });
  var myDate = new Date();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({
      ...data,
      [name]: value,
      userId: userState.currentUserId,
      createDate: myDate
    }));
  };


  const onSave = (e) => {
    e.preventDefault();
    addTask(data)
    setData({
    title: "",
    description: "",
    reminder: "",
    })
  };


  return (
    <div>
      <div className="container-fluid h-100 coloring">
        <div className="row align-items-center h-100">
          <div className="col-lg-6 bg-primary text-white h-100 justify-content-center align-items-center pb-5">
            <div className="m-0 p-5">
              <h2 className="text-white mb-3">Create Task</h2>
              <div className=" card border-0 shadow-sm rounded-2">
                <div className="card-header p-5 border-0 rounded-2">
                  <form className="form" onSubmit={onSave}>
                    <div className="mt-2 me-5 ms-3">
                      <label className="form-label fw-bold fs-5 text-dark">
                        Title
                      </label>
                      <input
                        name="title"
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Title"
                        onChange={handleChange}
                        value = {data.title}
                      />
                    </div>

                    <div className="mt-3 me-5 ms-3">
                      <label className="form-label fw-bold fs-5 text-dark">
                        Description
                      </label>
                      <input
                        name="description"
                        rows="3"
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput2"
                        placeholder="Description"
                        onChange={handleChange}
                        value={data.description}
                      />
                    </div>


                    <div className="mt-3 me-5 ms-3">
                      <label className="form-label fw-bold fs-5 text-dark">
                        Reminder Date And Time
                      </label>
                      <input
                        name="reminder"
                        type="datetime-local"
                        className="form-control"
                        id="formGroupExampleInput2"
                        onChange={handleChange}
                        value={data.reminder}
                        />
                        
                    </div>
                    <h6 className="text-dark m-3">{message}</h6>
                    <button
                      className="btn btn-dark btn-lg mt-2 ms-4">
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="col-lg-12 text-white">
              <Task currentData={data} />
            </div>

            <div className="col-lg-12">
              <RecentTask currentData={data}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
