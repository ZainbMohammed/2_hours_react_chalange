import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const HomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/users")
      .then((response) => setUsers(response.data.users))
      .catch((err) => alert("Failed to fetch users"));
  }, []);

  return (
    <div>
      <Header />
      <div className="p-4 mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg shadow-lg bg-white p-6 flex flex-col items-center text-center space-y-4"
          >
            <img
              src={user.image}
              alt={user.firstName}
              className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
            />

            <div className="text-gray-800 space-y-1">
              <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
              <p className="text-sm text-gray-600">{user.phone}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            <Link
              to={`/user/${user.id}`}
              className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg  transition duration-300"
            >
              Update
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
