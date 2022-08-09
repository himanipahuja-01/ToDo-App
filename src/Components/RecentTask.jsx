import React from "react";
import TodoContext from "../context/TodoContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dateFormat } from '../utils';

function RecentTask(props) {

  const { userState, tasks, getTasks } = useContext(TodoContext);
  const [currentData, setCurrentData] = useState([]);

var items=currentData.slice(0,3)

  useEffect(() => {
   
      if(userState.isLoggedIn){
      getTasks(userState.currentUserId)
      setCurrentData(tasks)
      }
 
 
  }, [userState, getTasks, tasks]);

// var items = currentData.slice(0,4)
// items.reverse()

// if(props.currentData){
// items.reverse();
// items.unshift(props.currentData);
// items.pop();
// }
                       
// console.log(items)

  return (
    <div>
      <div className="card bg-dark m-5">
        <div className="card-body">
          <h5 className="card-title text-white fs-3">Recently Added</h5>
          <table className="table table-dark p-5">
          <thead>
            <tr>

              <th>Title</th>
              <th>Reminder</th>
           
            </tr>
    </thead>

    <tbody>
      {items.map((item, key) => {
        return (

    <tr className="text-warning mb-3" key={key}>
      
      <td>{item.title}</td>
      <td>{dateFormat(item.reminder)}</td>
     
    </tr>

  );
        })}

      </tbody>        
    
    </table>
    <Link className="text-white text-decoration-none text-secondary mx-2" to="/TaskList">View more</Link>
        </div>
      </div>
    </div>
  );
}

export default RecentTask;
