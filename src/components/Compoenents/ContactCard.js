import React from "react";
import axios from "axios";
import { updateReminderFlag, deleteContactAPI } from "../feature/Contactapi";
// import { deleteContactAPI } from '../api/ContactAPI';

const ContactCard = ({
  contact,
  handleEdit,
  handleDelete,
  reminder,
  globalFlag,
  updateflage,
}) => {
  const handleClick = async (id, flag) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:5000/contacts/reminder-flag/${id}`, // ID in the URL
        { reminderFlag: flag }, // Reminder flag in the body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updateflage();

      console.log("Reminder flag updated successfully:", response.data);
    } catch (error) {
      console.error(
        "Failed to update reminder flag:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteClick = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      await deleteContactAPI(token, id);
      handleDelete(id);
      updateflage();
      alert("contact is deleted"); // Call your handleDelete function to update the UI after deletion
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  // Function to handle the icon click event, determining whether to toggle the reminderFlag or delete the contact
  const handleIconClick = () => {
    if (reminder && contact.reminderFlag === 1) {
      handleClick(contact._id, 0); // If reminderFlag is 1, set it to 0
    } else if (reminder && contact.reminderFlag === 0) {
      handleClick(contact._id, 1); // If reminderFlag is 0, set it to 1
    } else {
      handleDeleteClick(contact._id); // If no reminderFlag, proceed with deleting the contact
    }
  };

  // Function to get the appropriate icon class based on the reminderFlag
  const getIconClass = () => {
    if (reminder && contact.reminderFlag === 1) {
      return "fas fa-times cursor-pointer hover:text-red-500"; // Cross icon for reminderFlag = 1
    }
    if (reminder && contact.reminderFlag === 0) {
      return "fas fa-check cursor-pointer hover:text-green-500"; // Tick icon for reminderFlag = 0
    }
    return "fas fa-trash-alt cursor-pointer hover:text-red-500"; // Trash icon by default
  };

  // Function to render the Executive Director's contact card
  const EDcard = () => {
    return (
      <tr
        className={`${
          reminder && contact.reminderFlag === 1
            ? "bg-green-500" // Green background when reminderFlag is 1
            : "bg-[#2a3439]" // Default background color
        } bg-opacity-50 text-lg hover:bg-[#d1cfcb] hover:text-[#2a3439] duration-150 rounded-lg border`}
      >
        <td className="p-4">{contact.hrName}</td>
        <td className="p-4">{contact.hrCompany}</td>
        <td className="p-4">{contact.hrNumber}</td>
        {globalFlag === false ? (
          <td className="p-4 flex justify-end">
            <i
              className="fas fa-edit cursor-pointer hover:text-blue-500 mr-4"
              onClick={() => handleEdit(contact._id)}
            ></i>
            <i
              className={getIconClass()}
              onClick={handleIconClick} // Conditionally handle the click
            ></i>
          </td>
        ) : null}
      </tr>
    );
  };

  // Function to render the Member's contact card
  const membercard = () => {
    return (
      <tr
        className={`${
          reminder && contact.reminderFlag === 1
            ? "bg-green-500" // Green background when reminderFlag is 1
            : "bg-[#2a3439]" // Default background color
        } bg-opacity-50 text-lg hover:bg-[#d1cfcb] hover:text-[#2a3439] duration-150 rounded-lg border`}
      >
        <td className="p-4">{contact.hrName}</td>
        <td className="p-4">{contact.hrCompany}</td>
        <td className="p-4">{contact.hrNumber}</td>
        <td className="p-4 flex justify-end">
          <i
            className="fas fa-edit cursor-pointer hover:text-blue-500 mr-4"
            onClick={() => handleEdit(contact._id)}
          ></i>
          <i
            className={getIconClass()}
            onClick={handleIconClick} // Conditionally handle the click
          ></i>
        </td>
      </tr>
    );
  };

  // admin card
  const admincard = () => {
    return (
      <tr
        className={
          "bg-[#2a3439] bg-opacity-50 text-lg hover:bg-[#d1cfcb] hover:text-[#2a3439] duration-150 rounded-lg border"
        }
      >
        <td className="p-4">{contact.hrName}</td>
        <td className="p-4">{contact.hrCompany}</td>
        <td className="p-4">{contact.hrNumber}</td>
        <td className="p-4 flex justify-end">
          <i
            className="fas fa-edit cursor-pointer hover:text-blue-500 mr-4"
            onClick={() => handleEdit(contact._id)}
          ></i>
          <i
            className={getIconClass()}
            onClick={handleIconClick} // Conditionally handle the click
          ></i>
        </td>
      </tr>
    );
  };

  // Function to render the correct card based on the user's role
  const rendercard = () => {
    const role = sessionStorage.getItem("role"); // Get role from session storage

    switch (role) {
      case "Member":
        return membercard(); // Render Member card
      case "Executive Director":
        return EDcard(); // Render Executive Director card
      case "Admin":
        return admincard();
      default:
        return null; // or some default handling
    }
  };

  return rendercard(); // Return the rendered card based on the role
};

export default ContactCard;
