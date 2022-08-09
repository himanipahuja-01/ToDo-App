import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const [recenttask, setrecentTask] = useState({});

  const [record, setRecord] = useState([]);

  const [message, setMessage] = useState("");

  const [userList, setUserList] = useState([]);

  const [data, setData] = useState({});

  const [loggedUser, setLoggedUser] = useState({
    isLoggedIn: false,
    currentUserId: null,
    currentUserName: null,
    currentUserRole:null
  });

  const [userState, setUserState] = useState({});

  let navigate = useNavigate();

  // user methods
  var userLogin = async (formdata) => {
    const response = await fetch(
      `http://localhost:5000/user?email=${formdata.email}&password=${formdata.password}`,
      { method: "GET" }
    );

    if (response.ok) {
      const element = await response.json();
      if (element.length !== 0) {
        setLoggedUser((prev) => ({
          ...prev,
          isLoggedIn: true,
          currentUserId: element[0].id,
          currentUserName: element[0].username,
          currentUserRole: element[0].role
        }));

        setMessage('Logged in successfully')

        if (element[0].role === "admin") {
          // setIsAdmin(true);
          setTimeout(() => {
            setMessage("");
            navigate("/UserList");
          }, 2000);
        } else {
          setTimeout(() => {
            setMessage("");
            navigate("/TaskList");
          }, 2000);
        }
      } else {
        alert("not recieved");
      }
    }
  };

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("userState"));
    if (localData) {
      setUserState(localData);
    }
  }, [loggedUser]);

  const addUser = async (formdata) => {
    const checkUser = await fetch(
      `http://localhost:5000/user?email=${formdata.email}`
    );
    console.log(checkUser);
    const currentUser = await checkUser.json();

    if (checkUser.ok) {
      if (currentUser.length > 0) {
        alert("user already exist");
      } else {
        const methods = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        };
        const resp = await fetch("http://localhost:5000/user", methods);

        if (resp.ok) {
          alert("done");
        }
      }
    }
  };

  const putUserdetails = async (data, id) => {
    const methods = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`http://localhost:5000/user/${id}`, methods);

    if (response.ok) {
     setMessage('User updated successfully')
     setTimeout(() => {
      setMessage('')
     }, 2000);
    }
  };


  const getUsers = async () => {
    const response = await fetch(
      `http://localhost:5000/user?id=${userState.currentUserId}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const user = await response.json();
      // console.log(user);
      setUserList(user);
    } else {
      alert("please reload the page");
    }
  };

  

  const getAdmin = async () => {
    const response = await fetch("http://localhost:5000/user", {
      method: "GET",
    });
    if (response.ok) {
      const user = await response.json();
      // console.log(user);
      setUserList(user);
    } else {
      alert("please reload the page");
    }
  };



  
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const remove = await fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE",
      });

      console.log(remove);
      if (remove.ok) {
         await remove.json();
        // console.log(convert);
        if (userState.currentUserRole==="admin") {
          getAdmin();
        } if (userState.currentUserRole==="user") {
          getUsers();
        }
      }
    } else {
      console.log("cant delete");
    }
  };

  
  const getUserdetails = async (id) => {
    const response = await fetch(`http://localhost:5000/user/${id}`, {
      method: "GET",
    });
    if (response.ok) {
      const user = await response.json();
      // console.log(user);
      setData(user);
    }
  };


// task methods

  const addTask = async (data) => {
    setrecentTask(data);

    const create = await fetch(`http://localhost:5000/task`);
    const coming = await create.json();

    if (create.ok) {
      setRecord(coming);

      const meth = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const some = await fetch("http://localhost:5000/task", meth);

      if (some.ok) {
        setMessage("Task created successfully");
        setTimeout(() => {
          setMessage("");
          navigate("/CreateTask");
        }, 2000);
      }
    }
  };

  const getAdminTask = async () => {
    const response = await fetch(
      "http://localhost:5000/task?&_sort=id&_order=desc",
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const tasks = await response.json();
      setTasks(tasks);
    } else {
      alert("please reload the page");
    }
  };

  const getTasks = async (userId) => {
   
      const response = await fetch(
        `http://localhost:5000/task?userId=${userId}&_sort=id&_order=desc`,
        { method: "GET" }
      );
      if (response.ok) {
        let task = await response.json();
        setTasks(task);
      } else {
        throw Error("Please reload the app");
      }
  
  }

  const deleteUserTask = async (id) => {
    const remove = await fetch(`http://localhost:5000/task/${id}`, {
      method: "DELETE",
    });

    if (remove.ok) {
      await remove.json();

      if (userState.currentUserRole==="admin") {
        getAdminTask();
      } if(userState.currentUserRole==="user"){
        getTasks(userState.currentUserId);
      }
      setMessage('Task deleted successfully')
      setTimeout(() => {
        setMessage('')
      }, 3000);
    } else {
      console.log("cant delete");
    }
  };

  const getparticularTask = async (id) => {
    const response = await fetch(`http://localhost:5000/task/${id}`, {
      method: "GET",
    });
    if (response.ok) {
      const user = await response.json();
      setData(user);
    }
  };

  const putTaskdetails = async (data, id) => {
    const methods = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`http://localhost:5000/task/${id}`, methods);

    if (response.ok) {
      setMessage("task updated successfully");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        getparticularTask,
        data,
        userList,
        getUsers,
        getAdmin,
        putUserdetails,
        putTaskdetails,
        deleteUser,
        deleteUserTask,
        getAdminTask,
        userLogin,
        addUser,
        tasks,
        addTask,
        record,
        getTasks,
        message,
        loggedUser,
        userState,
        recenttask,
        getUserdetails,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
