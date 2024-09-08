import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Compoenents/Header";
import StatusBox from "../Compoenents/StatusBox";
import AddHRForm from "../Compoenents/AddHRForm";
import ContactList from "../Compoenents/ContactList";
import EditContact from "../Compoenents/EditContact";
import axios from "axios";

import Overlay from "../Compoenents/model";
import { set } from "mongoose";

const MemberPanel = () => {
  const [flag, setflag] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [FilteredItems, setFilteredItems] = useState([]);
  const [filterItemsCopy, setfilterItemsCopy] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [reminderFlag, setreminderFlag] = useState(false);
  const [filterFlag, setfilterFlag] = useState(false);
  const [totalLength, settotalLength] = useState("");
  const [currentStatus, setcurrentStatus] = useState("");
  const [statusCounts, setStatusCounts] = useState({
    notcalled: 0,
    blacklisted: 0,
    wrongnumber: 0,
    callednotreachable: 0,
    calledanddeclined: 0,
    calledandpostponed: 0,
    calledandaccepted: 0,
    emailedandawaiting: 0,
    emailedanddeclined: 0,
    emailedandconfirmed: 0,
  });

  //
  const updateflage = () => {
    setflag(!flag);
  };
  // to edit reminder overlay
  const [editId, seteditId] = useState("");
  const [isEOpen, setisEOpen] = useState(false);
  const editOverlay = () => {
    setisEOpen(!isEOpen);
    seteditId("");
  };

  // to add reminder overlay
  const [isAdd, setisAdd] = useState(false);
  const addOverlay = () => {
    setisAdd(!isAdd);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "Member") {
      navigate("/login");
      //   setResponseData(null)
    }
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [flag]);

  const filterItems = () => {
    if (reminderFlag === true) {
      // Filter contacts where the callback matches the selectedDate

      const filtered = contacts.filter((contact) => {
        const callbackDate = new Date(contact.callback)
          .toISOString()
          .split("T")[0]; // Format the date to 'YYYY-MM-DD'
        return callbackDate === selectedDate;
      });
      setFilteredItems(filtered);
      settotalLength(FilteredItems.length);
      if (filterFlag == true) {
        const filtered = FilteredItems.filter((contact) => {
          return contact.status === currentStatus;
        });
        setfilterItemsCopy(filtered);
      } else {
      }
    } else {
      if (filterFlag == true) {
        const filtered = contacts.filter((contact) => {
          return contact.status === currentStatus;
        });
        setFilteredItems(filtered);
      } else {
        // If reminderFlag is true, show all contacts

        setFilteredItems(contacts);
      }
      // setFilteredItems(contacts);
    }
  };

  const lgn = () => {
    if (reminderFlag === true) {
      settotalLength(FilteredItems.length);
    } else {
      settotalLength(contacts.length);
    }
  };

  useEffect(() => {
    filterItems();
  }, [contacts, reminderFlag, selectedDate, currentStatus, filterFlag, flag]);

  // count the filter length
  const countFilter = () => {
    if (filterFlag == false) {
      const newStatusCounts = {
        notcalled: 0,
        blacklisted: 0,
        wrongnumber: 0,
        callednotreachable: 0,
        calledanddeclined: 0,
        calledandpostponed: 0,
        calledandaccepted: 0,
        emailedandawaiting: 0,
        emailedanddeclined: 0,
        emailedandconfirmed: 0,
      };

      FilteredItems.forEach((contact) => {
        const normalizedStatus = contact.status
          .toLowerCase()
          .replace(/\s+/g, "");

        if (newStatusCounts.hasOwnProperty(normalizedStatus)) {
          newStatusCounts[normalizedStatus] += 1;
        } else {
          console.warn(`Unknown status encountered: ${contact.status}`);
        }
      });

      setStatusCounts(newStatusCounts);
    }
  };

  // to count the list
  useEffect(() => {
    countFilter();
    lgn();
  }, [FilteredItems, reminderFlag, contacts, flag]);

  //handel filter status
  const setStatusfiletr = (value) => {
    setfilterFlag(false);
    setfilterFlag(true);
    setcurrentStatus(value);
  };

  const removeStatusfilter = () => {
    setfilterFlag(false);
    setcurrentStatus("");
  };

  // handleEdit function to navigate to the EditContact component
  const handleEdit = (id) => {
    editOverlay();
    seteditId(id);
  };

  //  to handel reminder
  const reminder = () => {
    setreminderFlag(!reminderFlag);
    setSelectedDate(getCurrentDate());
    setfilterFlag(false);
  };

  const updateselectdate = (value) => {
    setSelectedDate(value);
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="bg-[#d1cfcb]">
      <Header reminder={reminder} reminderFlag={reminderFlag} />

      <div className="flex flex-wrap justify-center pt-24">
        <StatusBox
          status="Total"
          count={totalLength}
          onClose={removeStatusfilter}
        />
        <StatusBox
          status="Not called"
          count={statusCounts.notcalled}
          onClose={setStatusfiletr}
        />
        <StatusBox
          status="Blacklisted"
          count={statusCounts.blacklisted}
          onClose={setStatusfiletr}
        />
        <StatusBox
          status="Wrong number"
          count={statusCounts.wrongnumber}
          onClose={setStatusfiletr}
        />
        <StatusBox
          status="Called not reachable"
          count={statusCounts.callednotreachable}
          onClose={setStatusfiletr}
        />
        <StatusBox
          status="Called and declined"
          count={statusCounts.calledanddeclined}
          onClose={setStatusfiletr}
        />
        <StatusBox
          status="Called and postponed"
          count={statusCounts.calledandpostponed}
          onClose={setStatusfiletr}
        />
        <StatusBox
          status="Called and accepted"
          count={statusCounts.calledandaccepted}
          onClose={setStatusfiletr}
        />
        <StatusBox
          status="Emailed and awaiting"
          count={statusCounts.emailedandawaiting}
          onClose={setStatusfiletr}
        />
        <StatusBox
          status="Emailed and declined"
          count={statusCounts.emailedanddeclined}
          onClose={setStatusfiletr}
        />
        <StatusBox
          status="Emailed and confirmed"
          count={statusCounts.emailedandconfirmed}
          onClose={setStatusfiletr}
        />
      </div>

      {/* Pass the handleEdit function to ContactList */}
      <ContactList
        contacts={reminderFlag && filterFlag ? filterItemsCopy : FilteredItems}
        handleEdit={handleEdit}
        addOverlay={addOverlay}
        reminderFlag={reminderFlag}
        selectedDate={selectedDate}
        updateselectdate={updateselectdate}
        updateflage={updateflage}
        length={lgn}
      />

      {/* handeleditform */}
      <Overlay isOpen={isEOpen} onClose={editOverlay}>
        <EditContact
          id={editId}
          onClose={editOverlay}
          updateflage={updateflage}
        />
      </Overlay>

      <Overlay isOpen={isAdd} onClose={addOverlay}>
        <AddHRForm onClose={addOverlay} updateflage={updateflage} />
      </Overlay>
    </div>
  );
};

export default MemberPanel;
