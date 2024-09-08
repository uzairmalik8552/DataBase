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
    <div className="modal-background">
      <div className="modal-content">
        <h2 className="login-header">Add Member</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="input-group">
              <label className="input-group label">Name:</label>
              <input
                type="text"
                className="input-group input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                className="input-group input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                className="input-group label"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Executive Director:</label>
              <select
                className="input-group label"
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
          </div>
          <button className="submit-button" type="submit">
            Add Member
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AddMember;
