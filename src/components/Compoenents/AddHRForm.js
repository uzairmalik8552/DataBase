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
    hrCount: "",
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
    <div className="container mx-auto">
      <div className="flex flex-col py-12 px-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2 ">
            <input
              className="placeholder-[#000000] rounded-md border py-1 px-2 $ rounded"
              type="text"
              name="hrName"
              value={hrDetails.hrName}
              onChange={handleInputChange}
              placeholder="HR Name"
              required
            />
            <input
              className="placeholder-[#000000] rounded-md border py-1 px-2 $ rounded"
              type="text"
              name="hrNumber"
              value={hrDetails.hrNumber}
              onChange={handleInputChange}
              placeholder="HR Number"
              required
            />
          </div>
          <div className="mt-2">
            <input
              className={`placeholder-[#000000] rounded-md border py-1 px-2  w-full rounded`}
              type="text"
              name="hrCompany"
              value={hrDetails.hrCompany}
              onChange={handleInputChange}
              placeholder="HR Company"
              required
            />
          </div>
          <div className="mt-2">
            <input
              className={`placeholder-[#000000] rounded-md border py-1 px-2  w-full rounded`}
              type="email"
              name="hrEmail"
              value={hrDetails.hrEmail}
              onChange={handleInputChange}
              placeholder="HR Email"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <select
              className={`py-1 px-2   border border-gray-300 rounded`}
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
              <option value="Emailed and confirmed">
                Emailed and confirmed
              </option>
            </select>
            <select
              className={`py-1 px-2  border border-grey rounded`}
              name="transportMode"
              value={hrDetails.transportMode}
              onChange={handleInputChange}
            >
              <option value="">Select Transport Mode</option>
              <option value="Own Transport">Own Transport</option>
              <option value="College Transport">College Transport</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <select
              className={`py-1 px-2  border border-grey rounded`}
              name="interviewPreference"
              value={hrDetails.interviewPreference}
              onChange={handleInputChange}
            >
              <option value="">Select Interview Preference</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            <input
              className={`placeholder-[#000000] py-1 px-2  border border-grey rounded`}
              type="text"
              name="departmentPreference"
              value={hrDetails.departmentPreference}
              onChange={handleInputChange}
              placeholder="Department Preference"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <input
              className={`py-1 px-2  border border-grey rounded`}
              type="date"
              name="callback"
              value={hrDetails.callback}
              onChange={handleInputChange}
            />
            <input
              className={`py-1 px-2  border border-grey rounded`}
              type="time"
              name="callbackTime"
              value={hrDetails.callbackTime}
              onChange={handleInputChange}
              placeholder="Callback Time"
            />
            <input
              className={`placeholder-[#000000] py-1 px-2  border border-grey rounded`}
              type="number"
              name="hrCount"
              value={hrDetails.hrCount}
              onChange={handleInputChange}
              placeholder="HR Count"
            />
          </div>
          <div className="mt-2">
            <input
              className="placeholder-[#000000] rounded-md border py-2 px-2 border-[#A9A9A9] w-full rounded"
              type="text"
              name="address"
              value={hrDetails.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
          </div>
          <div className="mt-2">
            <textarea
              className="placeholder-[#000000] rounded-md border py-2 px-2 border-[#A9A9A9] w-full rounded"
              name="comment"
              value={hrDetails.comment}
              onChange={handleInputChange}
              placeholder="Comment"
            />
          </div>
          <div className="flex items-center justify-center mt-5">
            <button
              type="submit"
              className="px-5 py-2.5 w-full text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
            >
              Add HR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHRForm;
