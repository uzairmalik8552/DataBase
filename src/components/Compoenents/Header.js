import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/forese.png";

const Header = (props) => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("name");
    navigate(role === "admin" ? "/admin-login" : "/login");
  };

  const handleAddMember = () => {
    props.addmemberOverlay();
  };

  const handleAddExecutiveDirector = () => {
    props.addEDOverlay();
  };

  const renderAdminHeader = () => (
    <header className="bg-[#f5efe7] fixed w-full z-50 shadow-md mt-0 py-4 px-4 flex justify-between items-center">
      <img src={logo} alt="Logo" className="h-10" />
      <div className="space-x-4">
        <button
          className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
          onClick={handleAddExecutiveDirector}
        >
          Add Executive Director
        </button>
        <button
          className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
          onClick={handleAddMember}
        >
          Add Member
        </button>
        <button
          className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );

  const renderMemberHeader = () => (
    <header className="bg-[#969696] fixed top-0 left-0 w-full z-50 shadow-md py-4 px-4 flex justify-between items-center">
      <img src={logo} alt="Logo" className="h-10" />
      <div className="space-x-4">
        {props.reminderFlag === false ? (
          <button
            className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
            onClick={props.reminder}
          >
            Reminder
          </button>
        ) : (
          <button
            className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
            onClick={props.reminder}
          >
            Dashboard
          </button>
        )}
        <button
          className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );

  const renderEDHeader = () => (
    <header className="bg-[#969696] fixed top-0 left-0 w-full z-50 shadow-md py-4 px-4 flex justify-between items-center">
      <img src={logo} alt="Logo" className="h-10" />
      <div className="space-x-4">
        <button
          className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
          onClick={props.transfer}
        >
          Transfer
        </button>
        {props.reminderFlag === false ? (
          <button
            className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
            onClick={props.reminder}
          >
            Reminder
          </button>
        ) : (
          <button
            className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
            onClick={props.reminder}
          >
            Dashboard
          </button>
        )}
        {props.globalFlag === false ? (
          <button
            className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
            onClick={props.updatedglobalt}
          >
            Global
          </button>
        ) : (
          <button
            className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
            onClick={props.updatedglobalt}
          >
            Dashboard
          </button>
        )}
        <button
          className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#2a3439] bg-[#2a3439] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#2a3439]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );

  const renderHeader = () => {
    switch (role) {
      case "Admin":
        return renderAdminHeader();
      case "Member":
        return renderMemberHeader();
      case "Executive Director":
        return renderEDHeader();
      default:
        return null; // or some default header
    }
  };

  return renderHeader();
};

export default Header;
