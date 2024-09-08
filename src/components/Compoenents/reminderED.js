import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const ReminderED = ({ GroupedContacts, selectedDate, updateselectdate }) => {
  const [isToggled, setIsToggled] = useState({});

  // Handle the toggle action for each member
  const handleToggle = (index) => {
    setIsToggled((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="reminder-ed">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-[#2a3439] font-bold">Reminders</h2>
        <div className="flex items-center">
          <label
            htmlFor="date"
            className="block text-sm font-bold pr-2 text-gray-700"
          >
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => updateselectdate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md bg-[#969696]"
          />
        </div>
      </div>

      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Member Name</th>
            <th className="border border-gray-300 p-2">Called Counts</th>
            <th className="border border-gray-300 p-2">Not Called Counts</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {GroupedContacts.map((member, index) => (
            <tr
              key={index}
              className="bg-[#2a3439] bg-opacity-50 text-lg hover:bg-[#d1cfcb] hover:text-[#2a3439] duration-150 rounded-lg border"
            >
              <td className=" p-4 ">{member.name || "Unknown"}</td>
              <td className=" p-4 ">{member.called || 0}</td>
              <td className=" p-4 ">{member.notCalled || 0}</td>
              <td className=" p-4 ">
                <button onClick={() => handleToggle(index)}>
                  {isToggled[index] ? "Hide" : "Show"} Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {GroupedContacts.map((member, index) =>
        isToggled[index] ? (
          <div key={index} className="details mt-4">
            {member.contacts.map((contact, idx) => (
              <div
                key={idx}
                className={`${
                  contact.reminderFlag === 1
                    ? "bg-green-500" // Green background when reminderFlag is 1
                    : "bg-[#2a3439]" // Default background color
                } bg-opacity-50 text-lg hover:bg-[#d1cfcb] hover:text-[#2a3439] duration-150 border p-4`}
              >
                <p>{contact.hrName}</p>
              </div>
            ))}
          </div>
        ) : null
      )}
    </div>
  );
};

export default ReminderED;
