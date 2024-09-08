import React from "react";

const ContactTransfer = (props) => {
  const handleOrginChange = (event) => {
    props.orgin(event.target.value);
  };
  const handledestChange = (event) => {
    props.dest(event.target.value);
  };
  const lengthToTransfer = (event) => {
    props.transferLength(event.target.value);
  };

  const handleSubmit = () => {
    if (props.originMember == props.destMember) {
      console.log("hello ");
    }
    if (
      !props.originMember ||
      !props.destMember ||
      !props.finalLength ||
      props.finalLength <= 0 ||
      props.originMember === props.destMember ||
      props.finalLength > props.length
    ) {
      // Check which field is missing or invalid
      if (!props.originMember) {
        alert("Please select an origin member.");
      } else if (!props.destMember) {
        alert("Please select a destination member.");
      } else if (!props.finalLength || props.finalLength <= 0) {
        alert("Please enter a valid number of contacts to transfer.");
      } else if (props.originMember === props.destMember) {
        alert("Origin and destination members cannot be the same.");
      } else if (props.finalLength > props.length) {
        alert("Number of contacts to transfer exceeds available contacts.");
      }
      return;
    } else {
      props.update();
      props.transfer();
    }
  };

  return (
    <div>
      <h3>Transfer Contacts</h3>

      <div>
        <label>Select Origin Member:</label>
        <select onChange={handleOrginChange}>
          <option value="">Select Member</option>
          {props.members.map((member) => (
            <option key={member._id} value={member._id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      {/* <div>
        <label>Select Filter:</label>
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">Select Filter</option>
          <option value="Not called">Not Called</option>
          <option value="Blacklisted">Blacklisted</option>
          <option value="Called and declined">Called and Declined</option>
          
        </select>
      </div> */}

      <div>
        <label>Number of Contacts Available: {props.length}</label>
      </div>

      <div>
        <label>Enter Number of Contacts to Transfer:</label>
        <input
          type="number"
          value={props.finalLength}
          onChange={lengthToTransfer}
          min="1"
          max={props.length}
        />
      </div>

      <div>
        <label>Select Destination Member:</label>
        <select onChange={handledestChange}>
          <option value="">Select Member</option>
          {props.members.map((member) => {
            // if (member._id === props.orgin) {
            //   return null;
            // }

            return (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <button onClick={handleSubmit}>Transfer Contacts</button>
      </div>
    </div>
  );
};

export default ContactTransfer;
