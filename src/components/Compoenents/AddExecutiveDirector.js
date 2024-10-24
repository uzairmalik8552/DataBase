import React, { useState } from "react";
import axios from "axios";

const AddExecutiveDirector = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/users/add-executive-director",
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error creating Executive Director");
    }
  };

  return (
    <div className="container mx-auto flex flex-col py-12 px-5">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Add Executive Director
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 w-full text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
        >
          Add Executive Director
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default AddExecutiveDirector;
