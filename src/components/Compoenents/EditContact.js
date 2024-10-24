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
    <div className="container mx-auto">
      <div className="flex flex-col py-12 px-12">
        <h2 className="text-xl font-semibold text-center mb-6">Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2 ">
            <input
              className="placeholder-[#000000] rounded-md border py-1 px-2 $ rounded"
              type="text"
              name="hrName"
              value={formData.hrName}
              placeholder="HR Name"
              onChange={(e) =>
                setFormData({ ...formData, hrName: e.target.value })
              }
              required
            />

            <input
              className="placeholder-[#000000] rounded-md border py-1 px-2 $ rounded"
              name="hrNumber"
              value={formData.hrNumber}
              placeholder="Phone Number"
              onChange={(e) =>
                setFormData({ ...formData, hrNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="mt-2">
            <input
              className={`placeholder-[#000000] rounded-md border py-1 px-2  w-full rounded`}
              type="text"
              name="hrCompany"
              value={formData.hrCompany}
              placeholder="Company Name"
              onChange={(e) =>
                setFormData({ ...formData, hrCompany: e.target.value })
              }
              required
            />
          </div>
          <div className="mt-2">
            <input
              className={`placeholder-[#000000] rounded-md border py-1 px-2  w-full rounded`}
              name="hrEmail"
              value={formData.hrEmail}
              placeholder="HR Email"
              onChange={(e) =>
                setFormData({ ...formData, hrEmail: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <select
              className={`py-1 px-2   border border-gray-300 rounded`}
              name="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Status
              </option>
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
              className={`py-1 px-2   border border-gray-300 rounded`}
              name="transportMode"
              value={formData.transportMode}
              onChange={(e) =>
                setFormData({ ...formData, transportMode: e.target.value })
              }
            >
              <option value="" disabled>
                Transport Mode
              </option>
              <option value="Own Transport">Own Transport</option>
              <option value="College Transport">College Transport</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <select
              className={`py-1 px-2  border border-grey rounded`}
              name="interviewPreference"
              value={formData.interviewPreference}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  interviewPreference: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Interview Preference
              </option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>

            <input
              className={`placeholder-[#000000] py-1 px-2  border border-grey rounded`}
              type="text"
              name="departmentPreference"
              value={formData.departmentPreference}
              placeholder="Department Preference"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  departmentPreference: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <input
              className={`py-1 px-2  border border-grey rounded`}
              type="date"
              name="callback"
              value={formData.callback}
              onChange={(e) =>
                setFormData({ ...formData, callback: e.target.value })
              }
            />

            <input
              className={`py-1 px-2  border border-grey rounded`}
              type="time"
              name="callbackTime"
              value={formData.callbackTime}
              onChange={(e) =>
                setFormData({ ...formData, callbackTime: e.target.value })
              }
            />

            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              type="number"
              name="hrCount"
              value={formData.hrCount}
              placeholder="HR Count"
              onChange={(e) =>
                setFormData({ ...formData, hrCount: e.target.value })
              }
            />
          </div>

          <div className="mt-4">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              name="address"
              value={formData.address}
              placeholder="Address"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="mt-4">
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              name="comment"
              value={formData.comment}
              placeholder="Comments"
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-center mt-5">
            <button
              type="submit"
              className="px-5 py-2.5 w-full text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
            >
              Update Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
