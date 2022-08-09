import React, { useState, useEffect, useContext } from "react";
// import Task from "./Task";
import { FaTrash } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import TodoContext from "../context/TodoContext";
import { Link } from "react-router-dom";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useReducer } from "react";
import Modal from "./Modal";
// import TaskEdit from "./TaskEdit";
import { dateFormat } from "../utils";

const initialState = {};
function reducer(state, action) {
  switch (action.type) {
    case "DELETE":
      return { ...state, task: action.payload, modelValue: "delete" };
    case "VIEW":
      return { ...state, task: action.payload, modelValue: "view" };
    case "EDIT":
      return { ...state, task: action.payload, modelValue: "edit" };
    default:
      throw new Error();
  }
}

function TaskList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { userState, getTasks, getAdminTask, tasks, getAdmin, userList } =
    useContext(TodoContext);

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState({});

  // console.log(userState)

  useEffect(() => {
    if (userState.currentUserRole === "admin") {
      getAdminTask();
      getAdmin();
    }
    if (userState.currentUserRole === "user") {
      getTasks(userState.currentUserId);
    }
  }, [userState]);

  useEffect(() => {
    if (userList) {
      setUsers(userList);
    }
  }, [userList]);

  console.log(users);

  var filterList = tasks.filter(
    (task) => task.title.toLowerCase().indexOf(search.toLowerCase()) >= 0
  );

  return (
    <div>
      <div className="m-5 border-0 shadow p-5 bg-dark rounded">
        <div className="d-flex">
          <h3 className="text-light">
            <ins>Task List</ins>
          </h3>
          <Link to="/CreateTask" className="btn btn-info ms-auto">
            {" "}
            <FaRegEdit />
            Create Task
          </Link>
        </div>
        <div className="position-relative mt-3 mb-3">
          <FaSearch
            className="fa-solid fa-magnifying-glass mt-1 text-secondary position-absolute"
            style={{ top: "7px", left: "25px" }}
          />
          <input
            className="form-control ps-5"
            type="search"
            placeholder="search by title"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <table className="table table-dark p-5">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>UserName</th>
              <th>Date of Creation</th>
              <th>Reminder</th>
              {/* <th>Delete</th> */}
              {/* <th>Edit</th> */}
            </tr>
          </thead>

          <tbody>
            {filterList.map((item, id) => {
              return (
                <tr className="text-warning" key={id}>
                  {/* <th scope="row">{item.userId}</th> */}

                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  {users.map((user) => {
                    return (
                      <>{user.id === item.userId && <td>{user.username}</td>}</>
                    );
                  })}
                  <td>{dateFormat(item.createDate)}</td>
                  <td>{dateFormat(item.reminder)}</td>
                  <td>
                    {/* <button
                      className="btn btn-primary"
                      onClick={() => deleteUser(item.id)}
                    >
                      <FaTrash />
                    </button> */}
                    <span
                      className="m-2 fs-4 text-white"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#popup"
                      onClick={() => dispatch({ type: "VIEW", payload: item })}
                    >
                      <AiFillEye />
                    </span>
                    {/* </td>
                  <td> */}{" "}
                    {/* <Link
                      className="btn btn-info mb-3"
                      to={`/TaskEdit/${item.id}`}
                    >
                      Edit
                    </Link> */}
                    <span
                      className="m-2 fs-4 text-white"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#popup"
                      onClick={() => dispatch({ type: "EDIT", payload: item })}
                    >
                      <HiOutlinePencilAlt />
                    </span>
                    <span
                      className="m-2 fs-5 text-white"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#popup"
                      onClick={() =>
                        dispatch({ type: "DELETE", payload: item })
                      }
                    >
                      <FaTrash />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal content={state} />
    </div>

    //   <div>
    //     <div className="container-fluid coloring p-5">
    //       <div className="row d-flex justify-content-center">
    //         {task.map((item, id) => {
    //           return <Task item={item} deleteUser={deleteUser} key={id} />;
    //         })}
    //       </div>
    //     </div>
    //   </div>
  );
}

export default TaskList;
