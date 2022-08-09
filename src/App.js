// import logo from './logo.svg';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Components/About";
import CreateTask from "./Components/CreateTask";
import Navigation from "./Components/Navigation";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import TaskList from "./Components/TaskList";
import Home from "./Components/Home";
import { TodoProvider } from "./context/TodoContext";
import UserList from "./Components/UserList";
import Useredit from "./Components/Useredit";
import PageNotFound from "./Components/PageNotFound";
import TaskEdit from "./Components/TaskEdit";
// import Photo from "./Components/Photo";

function App() {
  return (
   
      <BrowserRouter>
      <TodoProvider>
      <Navigation/>
        <Routes>
          <Route exact path="/" element = {<Navigate replace to = "SignIn" />}></Route>
          <Route path = '/' element = {< Home />}>
          <Route path="SignUp" element={<SignUp />}></Route>
          <Route path="SignIn" element={<SignIn />}></Route>
          </Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="SignUp" element={<SignUp />}></Route>
          <Route path="SignIn" element={<SignIn />}></Route>
          <Route path="CreateTask" element={<CreateTask />}></Route>
          <Route path="TaskList" element={<TaskList />}></Route>
          <Route path="UserList" element={<UserList />}></Route>
          <Route path="Useredit/:id" element={<Useredit />}></Route>
          <Route path="TaskEdit/:id" element={<TaskEdit />}></Route>
          <Route path = "*" element = {<PageNotFound/>}></Route>
        </Routes>
        </TodoProvider>
      </BrowserRouter>
     
//todoprovider ko andr bhi likh skte hai then navigate kr skte hai todocontext me
  );
}

export default App;
