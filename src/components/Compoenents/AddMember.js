import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMember = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [executiveDirectorId, setExecutiveDirectorId] = useState("");
  const [executiveDirectors, setExecutiveDirectors] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/users/executive-directors",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setExecutiveDirectors(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        console.error("Error fetching executive directors", error);
      }
    };

    fetchDirectors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");
      console.log(executiveDirectorId);

      const response = await axios.post(
        "http://localhost:5000/users/add-member",
        { name, email, password, executiveDirectorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
      setName(" ");
      setEmail(" ");
      setPassword(" ");
      setExecutiveDirectorId(" ");
    } catch (error) {
      setMessage("Error adding member");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col py-12 px-5">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Member
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={executiveDirectorId}
              onChange={(e) => setExecutiveDirectorId(e.target.value)}
              required
            >
              <option value="">Select Executive Director</option>
              {executiveDirectors.map((director) => (
                <option key={director._id} value={director._id}>
                  {director.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="px-5 py-2.5 w-full text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
            type="submit"
          >
            Add Member
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddMember;
