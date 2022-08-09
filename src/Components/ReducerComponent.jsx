import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "increament":
      return { ...state, count: state.count + 1 };
    case "decreament":
      return { ...state, count: state.count - 1 };
    case "userUpdate":
      return {...state,  user: action.payload };
    default:
      throw new Error();
  }
};

function ReducerComponent(props) {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    user: {
      id: 1,
      userName: "Raghav",
      age: 22,
    },
  });

  const handleIncreament = () => {
    dispatch({ type: "increament" });
  };

  const handleDecreament = () => {
    dispatch({ type: "decreament" });
  };

  const handleUpdate = () => {
    dispatch({
      type: "userUpdate",
      payload: { id: 3, userName: "Rhythm", age: 23 },
    });
  };

  return (
    <div>
      <p>{state.count}</p>
      <p>{state.user.userName}</p>
      <button className="btn btn-info" onClick={handleIncreament}>
        +
      </button>
      <button className="btn btn-info" onClick={handleDecreament}>
        -
      </button>

      <button className="btn btn-info" onClick={handleUpdate}>
        userUpdate
      </button>
    </div>
  );
}

export default ReducerComponent;
