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
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col py-12 px-5">
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-6">
          Transfer Contacts
        </h3>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">
            Select Origin Member:
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleOrginChange}
          >
            <option value="">Select Member</option>
            {props.members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>


        <div className="mb-4 flex">
          <label className="block text-gray-600 mb-2">
            Number of Contacts Available:
          </label>
          <p className="px-3">{props.length}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">
            Enter Number of Contacts to Transfer:
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={props.finalLength}
            onChange={lengthToTransfer}
            min="1"
            max={props.length}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">
            Select Destination Member:
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handledestChange}
          >
            <option value="">Select Member</option>
            {props.members.map((member) => {
              return (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="px-5 py-2.5 w-full text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
            onClick={handleSubmit}
          >
            Transfer Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactTransfer;
