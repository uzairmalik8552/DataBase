import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const updateReminderFlag = async (token, data) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/contacts/reminder-flag",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Reminder flag updated successfully:", response.data);
  } catch (error) {
    console.error(
      "Error updating reminder flag:",
      error.response?.data || error.message
    );
  }
};

// Function to fetch members (for dropdown)
export const fetchMembers = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contacts/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetched members:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching members:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchAllContacts = async (token) => {
  try {
    // Making the API request
    const response = await axios.get("http://localhost:5000/contacts/all", {
      headers: {
        Authorization: `Bearer ${token}`, // Passing the token for authorization if needed
      },
    });

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Log and handle errors
    console.error(
      "Error fetching all contacts:",
      error.response?.data || error.message
    );
    throw error; // Optionally rethrow the error for further handling
  }
};

// Separate function to delete a contact
export const deleteContactAPI = async (token, id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/contacts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Contact deleted successfully:", response.data);
    return response.data; // Optionally return the response data
  } catch (error) {
    console.error(
      "Error deleting contact:",
      error.response?.data || error.message
    );
    throw error; // Optionally throw error to handle it in the calling function
  }
};
