import React, { useEffect, useState, useContext } from "react";
import TodoContext from "../context/TodoContext";
// import CreateTask from './CreateTask';
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { dateFormat } from "../utils";

function Task(props) {
  const [currentData, setCurrentData] = useState({});

  const { userState, tasks, getTasks } = useContext(TodoContext);

  useEffect(() => {
      if (userState.isLoggedIn) {
        getTasks(userState.currentUserId);
        setCurrentData(tasks[0])
      }
 
  }, [userState, getTasks, tasks]);

  return (
    <>
      <div className="card bg-dark m-5">
        <div className="card-body">
          <div>
            <div className="container">
              <div className="d-flex">
                <h5 className="card-title text-white fs-3">New Task</h5>
                {currentData && (
                  <>
                    <Link
                      className="btn btn-info mb-3 ms-auto"
                      to={`/TaskEdit/${currentData.id}`}
                    >
                      <FaRegEdit />
                      Edit
                    </Link>
                  </>
                )}

                {/* <Link className='btn btn-info mb-3' to={`/TaskEdit`}>{<FaRegEdit/>}Edit</Link> */}
              </div>
              {currentData && (
                <div className="text-white">
                  <h4 className="border-bottom d-inline">
                    {currentData.title}
                  </h4>
                  <p className="py-2">{currentData.description}</p>
                  <div className="d-flex text-warning">
                    {" "}
                    <p>Created : {dateFormat(currentData.createDate)}</p>
                    <p className="ms-auto">
                      Due: {dateFormat(currentData.reminder)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
