import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Compoenents/Header";
import StatusBox from "../Compoenents/StatusBox";

import ContactList from "../Compoenents/ContactList";
import EditContact from "../Compoenents/EditContact";
import Overlay from "../Compoenents/model";
import ReminderED from "../Compoenents/reminderED";
import ContactTransfer from "../Compoenents/ContactTransfer";
import axios from "axios";

import { fetchMembers, fetchAllContacts } from "../feature/Contactapi";

import { set } from "mongoose";

const ExecutiveDirectorPanel = () => {
  const [flag, setflag] = useState([]);
  const [globalFlag, setglobalFlag] = useState(false);
  const [global, setglobal] = useState([]);
  const [updateFlage, setupdateFlage] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [FilteredItems, setFilteredItems] = useState([]);
  const [filterItemsCopy, setfilterItemsCopy] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [reminderFlag, setreminderFlag] = useState(false);
  const [filterFlag, setfilterFlag] = useState(false);
  const [totalLength, settotalLength] = useState("");
  const [currentStatus, setcurrentStatus] = useState("");
  const [members, setmembers] = useState([]);
  const [memberFilterFlag, setmemberFilterFlag] = useState(false);
  const [memberfiltered, setmemberfiltered] = useState("");
  const [GroupedContacts, setGroupedContacts] = useState([]);
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

  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch contacts on component mount
    const getContacts = async () => {
      const token = sessionStorage.getItem("token"); // Get token from session storage
      try {
        // Fetch contacts using the API function
        const contactsData = await fetchAllContacts(token);
        setglobal(contactsData); // Set contacts in state
      } catch (error) {
        console.error("Error fetching contacts:", error); // Handle errors
      }
    };

    getContacts(); // Call the fetch function
  }, []);

  const updatedglobalt = () => {
    setglobalFlag(!globalFlag);
    setfilterFlag(false);
    setmemberFilterFlag(false);
  };

  const updateflage = () => {
    setflag(!flag);
  };

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
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "Executive Director") {
      navigate("/login");
      //   setResponseData(null)
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    loadMembers(token);
  }, []);

  // update flage change
  const updaterelode = () => {
    setupdateFlage(!updateFlage);
  };
  //fetching members
  const loadMembers = async (token) => {
    try {
      const membersData = await fetchMembers(token);
      setmembers(membersData);
    } catch (error) {
      console.error("Error loading members:", error);
    }
  };

  // to edit reminder overlay
  const [editId, seteditId] = useState("");
  const [isEOpen, setisEOpen] = useState(false);
  const editOverlay = () => {
    setisEOpen(!isEOpen);
    seteditId("");
  };

  // transfer contact reminder
  const [isTranfer, setisTransfer] = useState(false);
  const transferOverlay = () => {
    setisTransfer(!isTranfer);
    setoriginMember("");
    setdestMember("");
    settransferMemberLength("");
    settransferMember("");
    setfinalTransfer("");
  };
  // filter the contacts based on the condition
  const filterItems = () => {
    if (memberFilterFlag === true) {
      // Filter contacts where the callback matches the selectedDate

      const filtered = contacts.filter((contact) => {
        return contact.userId === memberfiltered;
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
    } else if (globalFlag == true) {
      setFilteredItems(global);
      if (filterFlag == true) {
        const filtered = FilteredItems.filter((contact) => {
          return contact.status === currentStatus;
        });
        setfilterItemsCopy(filtered);
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
    }
  };

  const lgn = () => {
    if (memberFilterFlag === true) {
      settotalLength(FilteredItems.length);
    } else if (globalFlag == true) {
      settotalLength(FilteredItems.length);
    } else {
      settotalLength(contacts.length);
    }
  };

  useEffect(() => {
    filterItems();
  }, [
    contacts,
    memberFilterFlag,
    memberfiltered,
    currentStatus,
    filterFlag,
    globalFlag,
  ]);

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
  }, [FilteredItems, reminderFlag, contacts]);

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

  const setmemberfilter = (value) => {
    setmemberFilterFlag(false);
    setmemberFilterFlag(true);
    setmemberfiltered(value);
  };
  const setmemberfilterfalse = (value) => {
    setmemberFilterFlag(false);
    setmemberfiltered(value);
  };

  const handleGroupedContacts = () => {
    if (reminderFlag === true) {
      // Filter contacts where the callback matches the selectedDate
      const filteredContacts = contacts.filter((contact) => {
        const callbackDate = new Date(contact.callback)
          .toISOString()
          .split("T")[0]; // Format the date to 'YYYY-MM-DD'
        return callbackDate === selectedDate;
      });

      // Group filtered contacts by userId
      const groupedContacts = filteredContacts.reduce((acc, contact) => {
        const { userId, reminderFlag } = contact;
        if (!acc[userId]) {
          acc[userId] = {
            name:
              members.find((member) => member._id === userId)?.name ||
              "Unknown",
            called: 0,
            notCalled: 0,
            contacts: [],
          };
        }

        // Count called and not called contacts
        if (reminderFlag === 1) {
          acc[userId].called += 1;
        } else {
          acc[userId].notCalled += 1;
        }

        acc[userId].contacts.push(contact);
        return acc;
      }, {});

      // Convert the grouped object into an array for easier rendering
      const groupedArray = Object.values(groupedContacts);
      setGroupedContacts(groupedArray);
    }
  };

  // Assuming this is called inside a useEffect or event handler
  useEffect(() => {
    handleGroupedContacts();
  }, [contacts, reminderFlag, selectedDate]);

  let contactsToDisplay;

  if (globalFlag) {
    contactsToDisplay = filterFlag ? filterItemsCopy : FilteredItems;
  } else {
    contactsToDisplay =
      memberFilterFlag && filterFlag ? filterItemsCopy : FilteredItems;
  }
  const [transferMember, settransferMember] = useState([]);
  const [finalTransfer, setfinalTransfer] = useState([]);
  const [transferMemberLength, settransferMemberLength] = useState("");
  const [finalTransferlength, setfinalTransferlength] = useState("0");
  const [originMember, setoriginMember] = useState("");
  const [destMember, setdestMember] = useState("");
  const [transferFlag, settransferFlag] = useState(false);
  const updateTransferFlag = () => {
    settransferFlag(true);
  };
  const dest = (value) => {
    setdestMember(value);
  };
  const onrgin = (value) => {
    setoriginMember(value);
  };
  //finter contact based on memeber
  const tranMemberfilter = () => {
    const filtered = contacts.filter((contact) => {
      return contact.userId === originMember;
    });
    settransferMember(filtered);
  };

  useEffect(() => {
    tranMemberfilter();
  }, [originMember]);

  // length of filted contacts based on memeber for transfer
  useEffect(() => {
    settransferMemberLength(transferMember.length);
  }, [transferMember]);

  const finalLengthTran = (value) => {
    setfinalTransferlength(value);
  };

  const transferContacts = async () => {
    const contactsToTransfer = transferMember.slice(0, finalTransferlength);
    const contactIds = contactsToTransfer.map((contact) => contact._id); // This should be an array
    settransferFlag(false); // Reset transfer flag

    try {
      const response = await axios.put(
        "http://localhost:5000/contacts/transfer-contacts",
        {
          sourceMemberId: originMember,
          targetMemberId: destMember,
          contactIds: contactIds, // Ensure this is an array
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Contacts transferred successfully");
      } else {
        alert(response.data.message || "Failed to transfer contacts");
      }
    } catch (error) {
      console.error("Error transferring contacts:", error.message);
      alert(
        error.response?.data?.message ||
          "Error transferring contacts. Please try again later."
      );
    }
  };

  return (
    <div className="bg-[#d1cfcb]">
      <Header
        reminder={reminder}
        reminderFlag={reminderFlag}
        transfer={transferOverlay}
        globalFlag={globalFlag}
        updatedglobalt={updatedglobalt}
      />

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
        contacts={contactsToDisplay}
        handleEdit={handleEdit}
        length={lgn}
        members={members}
        setmemberfilter={setmemberfilter}
        setmemberfilterfalse={setmemberfilterfalse}
        memberFilterFlag={memberFilterFlag}
        globalFlag={globalFlag}
        updateflage={updateflage}
      />

      {/* handeleditform */}
      <Overlay isOpen={isEOpen} onClose={editOverlay}>
        <EditContact
          id={editId}
          onClose={editOverlay}
          updaterelode={updaterelode}
          updateflage={updateflage}
        />
      </Overlay>

      <Overlay isOpen={reminderFlag} onClose={reminder}>
        <ReminderED
          // Ensure the key is unique
          GroupedContacts={GroupedContacts}
          selectedDate={selectedDate}
          updateselectdate={updateselectdate}
        />
      </Overlay>
      <Overlay isOpen={isTranfer} onClose={transferOverlay}>
        <ContactTransfer
          originMember={originMember}
          destMember={destMember}
          members={members}
          orgin={onrgin}
          dest={dest}
          length={transferMemberLength}
          transferLength={finalLengthTran}
          finalLength={finalTransferlength}
          update={updateTransferFlag}
          transfer={transferContacts}
        />
      </Overlay>
    </div>
  );
};

export default ExecutiveDirectorPanel;
