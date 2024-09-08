// src/components/StatusBox.js
import React from "react";

const StatusBox = ({ status, count, onClose }) => {
  const handelSubmit = () => {
    onClose(status);
  };
  return (
    <div className="flex flex-col text-[#d1cfcb] bg-[#2a3439] rounded-lg shadow-md w-full m-3 overflow-hidden sm:w-52">
      <h3 className="text-center px-2 pb-5 mt-2">{status}</h3>
      <button
        className="text-sm text-[#2a3439] p-3 text-center mb-0 bg-[#969696] "
        onClick={handelSubmit}
      >
        {count}
      </button>
    </div>
  );
};

export default StatusBox;
