import React from "react";
import TaskData from "../components/TaskData";
import GetTask from "./Task/get-task";
import Cookies from "js-cookie";

const Home: React.FC = () => {
  const userCookie = Cookies.get("user");
  const admin = userCookie ? JSON.parse(userCookie) === "admin" : null;
  console.log("admin", admin);

  return <div>{admin ? <TaskData /> : <GetTask />}</div>;
};

export default Home;
