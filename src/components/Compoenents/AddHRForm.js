// src/components/AddHRForm.js
import React, { useState } from "react";
import axios from "axios";

const AddHRForm = (props) => {
  const [hrDetails, setHRDetails] = useState({
    hrName: "",
    hrNumber: "",
    hrCompany: "",
    hrEmail: "",
    status: "Not called", // status is still required
    transportMode: "",
    interviewPreference: "",
    callback: "",
    callbackTime: "",
    comment: "",
    address: "",
    departmentPreference: "",
    hrCount: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    console.log(hrDetails);

    try {
      await axios.post("http://localhost:5000/contacts/add-hr", hrDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      props.updateflage();
      props.onClose();
    } catch (error) {
      console.log("error while returning from api");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHRDetails({ ...hrDetails, [name]: value });
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="hrName"
            value={hrDetails.hrName}
            onChange={handleInputChange}
            placeholder="HR Name"
            required
          />
          <input
            type="text"
            name="hrNumber"
            value={hrDetails.hrNumber}
            onChange={handleInputChange}
            placeholder="HR Number"
            required
          />
          <input
            type="text"
            name="hrCompany"
            value={hrDetails.hrCompany}
            onChange={handleInputChange}
            placeholder="HR Company"
            required
          />
          <input
            type="email"
            name="hrEmail"
            value={hrDetails.hrEmail}
            onChange={handleInputChange}
            placeholder="HR Email"
          />
          <select
            name="status"
            value={hrDetails.status}
            onChange={handleInputChange}
            required
          >
            <option value="Not called">Not called</option>
            <option value="Blacklisted">Blacklisted</option>
            <option value="Wrong number">Wrong number</option>
            <option value="Called not reachable">Called not reachable</option>
            <option value="Called and declined">Called and declined</option>
            <option value="Called and postponed">Called and postponed</option>
            <option value="Called and accepted">Called and accepted</option>
            <option value="Emailed and awaiting">Emailed and awaiting</option>
            <option value="Emailed and declined">Emailed and declined</option>
            <option value="Emailed and confirmed">Emailed and confirmed</option>
          </select>
          <select
            name="transportMode"
            value={hrDetails.transportMode}
            onChange={handleInputChange}
          >
            <option value="">Select Transport Mode</option>
            <option value="Own Transport">Own Transport</option>
            <option value="College Transport">College Transport</option>
          </select>

          <select
            name="interviewPreference"
            value={hrDetails.interviewPreference}
            onChange={handleInputChange}
          >
            <option value="">Select Interview Preference</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          <input
            type="date"
            name="callback"
            value={hrDetails.callback}
            onChange={handleInputChange}
          />
          <input
            type="time"
            name="callbackTime"
            value={hrDetails.callbackTime}
            onChange={handleInputChange}
            placeholder="Callback Time"
          />

          <textarea
            name="comment"
            value={hrDetails.comment}
            onChange={handleInputChange}
            placeholder="Comment"
          />
          <input
            type="text"
            name="address"
            value={hrDetails.address}
            onChange={handleInputChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="departmentPreference"
            value={hrDetails.departmentPreference}
            onChange={handleInputChange}
            placeholder="Department Preference"
          />
          <input
            type="number"
            name="hrCount"
            value={hrDetails.hrCount}
            onChange={handleInputChange}
            placeholder="HR Count"
          />
          <button type="submit">Add HR</button>
        </form>
      </div>
    </div>
  );
};

export default AddHRForm;
