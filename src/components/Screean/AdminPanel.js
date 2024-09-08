import AddMember from "../Compoenents/AddMember";
import AddExecutiveDirector from "../Compoenents/AddExecutiveDirector";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Compoenents/Header";
import StatusBox from "../Compoenents/StatusBox";

import ContactList from "../Compoenents/ContactList";
import EditContact from "../Compoenents/EditContact";
import Overlay from "../Compoenents/model";

import { fetchMembers, fetchAllContacts } from "../feature/Contactapi";

const AdminPanel = () => {
  const [flag, setflag] = useState(false);
  const [globalFlag, setglobalFlag] = useState(false);

  const [updateFlage, setupdateFlage] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [FilteredItems, setFilteredItems] = useState([]);
  const [filterItemsCopy, setfilterItemsCopy] = useState([]);

  const [filterFlag, setfilterFlag] = useState(false);
  const [totalLength, settotalLength] = useState("");
  const [currentStatus, setcurrentStatus] = useState("");
  const [members, setmembers] = useState([]);
  const [memberFilterFlag, setmemberFilterFlag] = useState(false);
  const [memberfiltered, setmemberfiltered] = useState("");

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
  useEffect(() => {
    // Function to fetch contacts on component mount
    const getContacts = async () => {
      const token = sessionStorage.getItem("token"); // Get token from session storage
      try {
        // Fetch contacts using the API function
        const contactsData = await fetchAllContacts(token);
        setContacts(contactsData); // Set contacts in state
      } catch (error) {
        console.error("Error fetching contacts:", error); // Handle errors
      }
    };

    getContacts(); // Call the fetch function
  }, [flag]);

  const updateflage = () => {
    setflag(!flag);
  };

  // useEffect(() => {
  //   const fetchContacts = async () => {
  //     try {
  //       const token = sessionStorage.getItem("token");
  //       const response = await axios.get("http://localhost:5000/contacts", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setContacts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching contacts:", error);
  //     }
  //   };

  //   fetchContacts();
  // }, []);

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "Admin") {
      navigate("/admin-login");
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

  // to add reminder overlay
  const [isAddmember, setisAddmember] = useState(false);
  const addmemberOverlay = () => {
    setisAddmember(!isAddmember);
  };
  const [isAdded, setisAdded] = useState(false);
  const addEDOverlay = () => {
    setisAdded(!isAdded);
  };
  const navigate = useNavigate();

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
    } else {
      settotalLength(contacts.length);
    }
  };

  useEffect(() => {
    filterItems();
  }, [contacts, memberFilterFlag, memberfiltered, currentStatus, filterFlag]);

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
  }, [FilteredItems, contacts]);

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

  const setmemberfilter = (value) => {
    setmemberFilterFlag(false);
    setmemberFilterFlag(true);
    setmemberfiltered(value);
  };
  const setmemberfilterfalse = (value) => {
    setmemberFilterFlag(false);
    setmemberfiltered(value);
  };

  let contactsToDisplay;

  if (globalFlag) {
    contactsToDisplay = filterFlag ? filterItemsCopy : FilteredItems;
  } else {
    contactsToDisplay =
      memberFilterFlag && filterFlag ? filterItemsCopy : FilteredItems;
  }
  return (
    <div className="bg-[#d1cfcb]">
      <Header addmemberOverlay={addmemberOverlay} addEDOverlay={addEDOverlay} />

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

      <Overlay isOpen={isAdded} onClose={addEDOverlay}>
        <AddExecutiveDirector onClose={addEDOverlay} />
      </Overlay>

      <Overlay isOpen={isAddmember} onClose={addmemberOverlay}>
        <AddMember onClose={addmemberOverlay} />
      </Overlay>
    </div>
  );
};

export default AdminPanel;
