import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import TodoContext from "../context/TodoContext";

function UserList(props) {
  const {
    userState,
    getAdmin,
    getUsers,
    deleteUser,
    userList,
  } = useContext(TodoContext);

  useEffect(() => {
    if (userState.currentUserRole === "admin") {
      getAdmin();
    }
    if (userState.currentUserRole === "user") {
      getUsers();
    }
  }, [userState, getAdmin, getUsers]);

 
  return (
    <div>
      <div className="m-5 border-0 shadow p-5 bg-dark rounded">
        <h3 className="text-white">
          <ins>USERLIST</ins>
        </h3>
        <table className="table table-dark p-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>USERNAME</th>
              <th>EMAIL</th>
              <th>PASSWORD</th>
              <th>ROLE</th>
            </tr>
          </thead>

          <tbody>
            {userList.map((item, id) => {
              return (
                <tr className="text-white" key={id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>{item.role}</td>

                  {userState && (
                    <>
                      <td>
                        <Link
                          className="btn btn-info"
                          to={`/Useredit/${item.id}`}
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        <Link className="btn btn-success" to={`/TaskList`}>
                          View
                        </Link>
                      </td>
                    </>
                  )}
                  {userState.isLoggedIn && userState.currentUserRole==="admin" && "user" === item.role && (
                    <>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}

                  {/* <td>
                    <Link className="btn btn-info" to={`//${item.id}`}>
                      Delete
                    </Link>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
