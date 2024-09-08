import React, { useState } from "react";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddHR = () => {
    props.addOverlay();
  };

  const handleReminder = (e) => {
    props.updateselectdate(e.target.value);
  };

  const filteredContacts = props.contacts.filter(
    (contact) =>
      contact.hrName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.hrNumber.includes(searchTerm)
  );

  const handleMemberChange = (event) => {
    if (event.target.value === "") {
      props.setmemberfilterfalse(event.target.value);
    } else {
      props.setmemberfilter(event.target.value);
    }
  };

  // Function to render the UI for Member role
  const renderMember = () => {
    return (
      <div>
        {props.reminderFlag === false ? (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-[#2a3439] font-bold">HR Contacts</h2>
            <button
              className="bg-[#2a3439] text-[#f5efe7] py-2 px-4 rounded"
              onClick={handleAddHR}
            >
              Add Contact
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-[#2a3439] font-bold">Reminders</h2>
            <div className="flex justify-between items-center mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-bold pr-2 text-gray-700"
              >
                Select Date:
              </label>
              <input
                type="date"
                id="date"
                value={props.selectedDate}
                onChange={handleReminder}
                className="mb-4 mt-1 p-2 border border-gray-300 rounded-md bg-[#969696]"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  // Function to render the UI for Executive Director role
  const renderED = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-[#2a3439] font-bold">HR Contacts</h2>
          <div className="flex">
            {props.globalFlag === false ? (
              <>
                {props.memberFilterFlag === true ? (
                  <button className="bg-[#2a3439] text-[#f5efe7] py-2 px-5 mr-5 rounded-full hover:bg-[#969696] hover:text-[#2a3439]">
                    Upload
                  </button>
                ) : (
                  <></>
                )}
                <select
                  onChange={handleMemberChange}
                  className="w-full p-3 bg-[#2a3439] text-[#f5efe7] rounded-lg shadow-md"
                >
                  <option className="bg-[#969696]" value="">
                    All Members
                  </option>
                  {props.members.map((member) => (
                    <option
                      className="bg-[#969696]"
                      key={member._id}
                      value={member._id}
                    >
                      {member.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Function to render the header based on the role
  const render = () => {
    const role = sessionStorage.getItem("role"); // Get role from session storage

    switch (role) {
      case "Member":
        return renderMember();
      case "Executive Director":
        return renderED();
      default:
        return null; // or some default header
    }
  };

  const renderEDtable = () => {
    return props.globalFlag == false ? (
      <thead>
        <tr className="text-[#f5efe7] bg-[#2a3439]">
          <th className="p-4 text-left">Name</th>
          <th className="p-4 text-left">Company</th>
          <th className="p-4 text-left">Contact Number</th>
          <th className="p-4 text-right">Actions</th>
        </tr>
      </thead>
    ) : (
      <thead>
        <tr className="text-[#f5efe7] bg-[#2a3439]">
          <th className="p-4 text-left">Name</th>
          <th className="p-4 text-left">Company</th>
          <th className="p-4 text-left">Contact Number</th>
        </tr>
      </thead>
    );
  };

  const rendermembertable = () => {
    return (
      <thead>
        <tr className="text-[#f5efe7] bg-[#2a3439]">
          <th className="p-4 text-left">Name</th>
          <th className="p-4 text-left">Company</th>
          <th className="p-4 text-left">Contact Number</th>
          <th className="p-4 text-right">Actions</th>
        </tr>
      </thead>
    );
  };

  const rendertablehead = () => {
    const role = sessionStorage.getItem("role"); // Get role from session storage

    switch (role) {
      case "Member":
        return rendermembertable();
      case "Executive Director":
        return renderEDtable();
      case "Admin":
        return rendermembertable();
      default:
        return null; // or some default header
    }
  };

  return (
    <div className="p-4">
      <div>{render()}</div>

      <div className="relative mb-4">
        <i className="fas fa-search absolute top-1/2 left-3 transform -translate-y-1/2 text-[#f5efe7] text-xl"></i>
        <input
          type="text"
          placeholder="Search by HR Name or Number"
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 py-2 bg-[#2a3439] text-[#f5efe7] rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full shadow-md">
          {rendertablehead()}
          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <ContactCard
                  key={contact._id}
                  contact={contact}
                  handleEdit={props.handleEdit}
                  reminder={props.reminderFlag}
                  handleDelete={props.handleDelete}
                  globalFlag={props.globalFlag}
                  updateflage={props.updateflage}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No contacts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
