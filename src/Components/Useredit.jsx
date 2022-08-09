import React, { useEffect, useState, useContext  } from "react";
import { useParams , useNavigate} from "react-router-dom";
import TodoContext from "../context/TodoContext";

function Useredit(props) {
  
  const { getUserdetails, putUserdetails, data, userState,  message} = useContext(TodoContext);

  const [datas, setDatas] = useState({});
  

  useEffect(()=>{
    if(data){
      setDatas(data)
    }
  },[data])

  let { id } = useParams();
  
  useEffect(() => {
    if(userState.isLoggedIn){
    getUserdetails(id);
    }
  }, [userState]);

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDatas((data) => ({
      ...data,
      [name]: value,
    }));
  };

  let navigate = useNavigate()

const onsave = (e) =>{
    e.preventDefault();
    putUserdetails(datas, datas.id);
    setTimeout(() => {
      navigate('/UserList')
    }, 2000);
    
}

  return (
    <div>
      <form onSubmit={onsave}>
        <div className="mb-4">
          <label className="form-label" htmlFor="email">
            email
          </label>
          <input
            type="text"
            name="email"
            className="form-control"
            readOnly
            id="email"
            value={datas.email}
            onChange={handlechange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">
            username
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="username"
            value={datas.username}
            onChange={handlechange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="password">
            password
          </label>
          <input
            type="text"
            name="password"
            className="form-control"
            id="password"
            value={datas.password}
            onChange={handlechange}
          />
        </div>
        <p>{message}</p>
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default Useredit;
