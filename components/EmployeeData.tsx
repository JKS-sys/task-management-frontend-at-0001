import React, { useState, useEffect } from "react";
import { API } from "../global";
import Cookies from "js-cookie";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface UserData {
  name: string;
  email: string;
  department: string;
  _id: string;
  role: string;
}

interface Status {
  name: string;
  status: string;
}

const TaskData: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const searchTask = useSelector((state: RootState) => state.Tasks.searchQuery);
  console.log(searchTask, "from Task");

  const token = Cookies.get("token");
  const admin = Cookies.get("user")
    ? JSON.parse(Cookies.get("user") as string)
    : null;

  console.log("admin", admin);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}task/all-Tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredRole = response.data.filter(
        (item: UserData) => item.role !== "admin"
      );
      const filteredSearch = filteredRole.filter(
        (Task: UserData) =>
          Task.name.toLowerCase().includes(searchTask.toLowerCase()) ||
          Task.department.toLowerCase().includes(searchTask.toLowerCase())
      );
      setData(filteredSearch);
      setLoading(false);
    } catch (error) {
      console.error("error while fetching Task", error);
    }
  };

  const getTaskStatus = async () => {
    try {
      const response = await axios.get(`${API}task/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchTask();
      getTaskStatus();
    }
  }, [admin, searchTask]);

  const getStatus = (TaskId: string) => {
    const statusEntry = status.find((statusInfo) => statusInfo.name === TaskId);
    return statusEntry ? statusEntry.status : "pending";
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {loading ? (
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      ) : data.length > 0 ? (
        data.map((Task) => (
          <div
            key={Task._id}
            className="bg-white shadow-lg rounded-2xl p-6 w-96 border border-gray-200 hover:shadow-2xl transition-all hover:translate-y-1"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 rounded-t-lg text-lg font-semibold text-center">
              {Task.department}
            </div>

            {/* Body */}
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold">{Task.name}</h3>
              <p className="text-gray-600">{Task.email}</p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t pt-3">
              <span className="px-3 py-1 rounded-lg text-sm font-medium bg-yellow-300 text-black">
                {getStatus(Task.name)}
              </span>
              <Link
                href={{
                  pathname: `assign-task/${Task._id}`,
                  query: { name: Task.name, department: Task.department },
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition no-underline"
              >
                Assign Task
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 w-full">No Tasks found.</p>
      )}
    </div>
  );
};

export default TaskData;
