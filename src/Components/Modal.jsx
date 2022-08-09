import React, { useEffect, useState, useContext } from "react";
import { ImCross } from "react-icons/im";
import { dateFormat } from "../utils";
import TodoContext from "../context/TodoContext";

function Modal(props) {
  // console.log(props.content);

    const {putTaskdetails , message, deleteUserTask} = useContext(TodoContext);

  const [data, setData] = useState({
    title: "",
    description: "",
    reminder: "",
  });

var task = props.content.task

  useEffect(() => {
    if(task){
      setData(task);
    }
 
  }, [task]);

  const todaydate = new Date();
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({
      ...data,
      [name]: value,
      createDate: todaydate,
    }));
  };

  const onsave = (e) => {
    e.preventDefault();
    putTaskdetails(data, data.id).then(()=>{
      var popup = e.target.closest('#popup');
      setTimeout(()=>{
       popup.style.display = "none";
       document.querySelector(".modal-backdrop").style.display = "none";
   }, 3000);
    });
  };

const deleteTask = (e)=>{
  deleteUserTask(data.id).then(()=>{
    var popup = e.target.closest('#popup');
    setTimeout(() => {
      popup.style.display = "none";
      document.querySelector('.modal-backdrop').style.display = "none"
    }, 3000);
  })
}

  return (
    <div>
      <div
        className="modal fade margin"
        id="popup"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog model-dialog-centered">
          <div className="modal-content bg-dark">
            <div className="modal-header py-2">
              <span
                className="ms-auto text-white close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <ImCross />
              </span>
            </div>
            <div className="modal-body text-white">
              {props.content.modelValue === "view" ? (
                <div className="card bg-dark">
                  <div className="card-body">
                    <div className="text-white">
                      <h4 className="border-bottom d-inline">
                        {props.content.task.title}
                      </h4>
                      <p className="py-2">{props.content.task.description}</p>
                      <div className="d-flex text-warning">
                        {" "}
                        <p>
                          Created : {dateFormat(props.content.task.createDate)}
                        </p>
                        <p className="ms-auto">
                          Due: {dateFormat(props.content.task.reminder)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : props.content.modelValue === "edit" ? (
                <div className="container-fluid">
                  <div className="">
                    <h2 className="text-white mb-3">Task Edit</h2>
                    <div className=" card border-0 rounded-2 mb-5">
                      <div className="card-header border-0 rounded-2">
                        <form className="form">
                          <div className="mt-2 me-5 ms-3">
                            <label className="form-label fw-bold fs-5 text-dark">
                              Title
                            </label>
                            <input
                              name="title"
                              type="text"
                              className="form-control"
                              value={data.title}
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
                              value={data.description}
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
                              value={data.reminder}
                              onChange={handlechange}
                            />
                          </div>
                          <p className="text-dark ms-4">{message}</p>
                          <div className="d-flex">
                            <button className="btn btn-dark btn-lg ms-4" onClick={onsave}>
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
              <div className="pb-4">
                {message === "" ? (
                  <>
                    <p> Are you sure you want to delete the task?</p>
                    <button className="btn btn-danger me-2" onClick={deleteTask}>
                      Yes
                    </button>
                    <button
                      className="btn btn-secondary"
                      // ref={element}
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <p>{message}</p>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
