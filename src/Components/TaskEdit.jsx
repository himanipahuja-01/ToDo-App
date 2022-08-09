import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Task from "./Task";
import RecentTask from "./RecentTask";
import { useNavigate } from "react-router-dom";
import TodoContext from "../context/TodoContext";

function TaskEdit(props) {
  const { getparticularTask, data, putTaskdetails, message } =
    useContext(TodoContext);
  const [datas, setDatas] = useState({});

  let { id } = useParams();

  let navigate = useNavigate();

  // console.log(message)

  useEffect(() => {
    getparticularTask(id);
  }, []);

  useEffect(() => {
    if (data) {
      setDatas(data);
    }
  }, [data]);


  const todaydate = new Date();
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDatas((data) => ({
      ...data,
      [name]: value,
      createDate: todaydate,
    }));
  };

  const onsave = (e) => {
    e.preventDefault();
    putTaskdetails(datas, datas.id);
    setTimeout(() => {
      navigate("/CreateTask");
    },2000);
   
  };

  return (
    <div>
      <div className="container-fluid h-100 coloring">
        <div className="row align-items-center h-100">
          <div className="col-lg-6 bg-primary text-white h-100 justify-content-center align-items-center pb-5">
            <div className="m-0 p-5">
              <h2 className="text-white mb-3">Task Edit</h2>
              <div className=" card border-0 shadow-sm rounded-2">
                <div className="card-header p-5 border-0 rounded-2">
                  <form className="form" onSubmit={onsave}>
                    <div className="mt-2 me-5 ms-3">
                      <label className="form-label fw-bold fs-5 text-dark">
                        Title
                      </label>
                      <input
                        name="title"
                        type="text"
                        className="form-control"
                        value={datas.title}
                        onChange={handlechange}
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
                        value={datas.description}
                        onChange={handlechange}
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
                        value={datas.reminder}
                        onChange={handlechange}
                      />
                    </div>
                    <p className="text-dark ms-4 mt-1">{message}</p>
                    <div className="d-flex">
                      <button className="btn btn-dark btn-lg ms-4 ">
                        Save
                      </button>
                      <Link
                        className="btn btn-dark btn-lg ms-4 "
                        to="/CreateTask"
                      >
                        New task
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="col-lg-12">
              <Task />
            </div>
            <div className="col-lg-12">
              <RecentTask />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskEdit;
