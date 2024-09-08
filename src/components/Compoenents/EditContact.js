import React, { useState, useEffect } from "react";

import axios from "axios";

const EditContact = (props) => {
  const [formData, setFormData] = useState({
    hrName: "",
    hrNumber: "",
    hrCompany: "",
    hrEmail: "",
    status: "",
    transportMode: "",
    interviewPreference: "",
    callback: "",
    callbackTime: "",
    comment: "",
    address: "",
    departmentPreference: "",
    hrCount: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:5000/contacts/single?id=${props.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchContact();
  }, [props.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate compulsory fields
    if (
      !formData.hrName ||
      !formData.hrNumber ||
      !formData.hrCompany ||
      !formData.status
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:5000/contacts/${props.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        props.updateflage();
        alert("Contact updated successfully");
        props.onClose();
        props.updaterelode();
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <div className="edit-contact">
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>HR Name:</label>
          <input
            type="text"
            name="hrName"
            value={formData.hrName}
            onChange={(e) =>
              setFormData({ ...formData, hrName: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="hrNumber"
            value={formData.hrNumber}
            onChange={(e) =>
              setFormData({ ...formData, hrNumber: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="hrCompany"
            value={formData.hrCompany}
            onChange={(e) =>
              setFormData({ ...formData, hrCompany: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>HR Email:</label>
          <input
            type="email"
            name="hrEmail"
            value={formData.hrEmail}
            onChange={(e) =>
              setFormData({ ...formData, hrEmail: e.target.value })
            }
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
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
        </div>
        <div>
          <label>Transport Mode:</label>
          <select
            name="transportMode"
            value={formData.transportMode}
            onChange={(e) =>
              setFormData({ ...formData, transportMode: e.target.value })
            }
          >
            <option value="">Select</option>
            <option value="Own Transport">Own Transport</option>
            <option value="College Transport">College Transport</option>
          </select>
        </div>
        <div>
          <label>Interview Preference:</label>
          <select
            name="interviewPreference"
            value={formData.interviewPreference}
            onChange={(e) =>
              setFormData({ ...formData, interviewPreference: e.target.value })
            }
          >
            <option value="">Select</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <div>
          <label>Callback:</label>
          <input
            type="date"
            name="callback"
            value={formData.callback}
            onChange={(e) =>
              setFormData({ ...formData, callback: e.target.value })
            }
          />
        </div>
        <div>
          <label>Callback Time:</label>
          <input
            type="time"
            name="callbackTime"
            value={formData.callbackTime}
            onChange={(e) =>
              setFormData({ ...formData, callbackTime: e.target.value })
            }
          />
        </div>
        <div>
          <label>Comments:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
        <div>
          <label>Department Preference:</label>
          <input
            type="text"
            name="departmentPreference"
            value={formData.departmentPreference}
            onChange={(e) =>
              setFormData({ ...formData, departmentPreference: e.target.value })
            }
          />
        </div>
        <div>
          <label>HR Count:</label>
          <input
            type="number"
            name="hrCount"
            value={formData.hrCount}
            onChange={(e) =>
              setFormData({ ...formData, hrCount: e.target.value })
            }
          />
        </div>
        <button type="submit">Update Contact</button>
      </form>
    </div>
  );
};

export default EditContact;
