import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalUserCount, setTotalUserCount] = useState(0);

  useEffect(() => {
    // Fetch user data from the backend API
    axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data.users);
        setTotalUserCount(response.data.totalCount);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleDisableUser = (userId) => {
    // Logic to disable the user
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4 text-center">User Management</h2>
      <p className="text-lg mb-4 text-center">Total Users: {totalUserCount}</p>
      <ul>
        {users?.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between py-4 border-b border-gray-200"
          >
            <span className="text-lg">{user.name}</span>
            <button
              onClick={() => handleDisableUser(user.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Disable
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
