import { Fragment } from "react";

export function Overlay({ isOpen, onClose, children }) {
  return (
    <Fragment>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-[#2a3439] opacity-90 cursor-pointer" />
          <div className="relative bg-[#f5efe7] p-8 max-w-screen-sm w-full rounded-lg shadow-lg z-10">
            <div className="flex justify-end">
              <button
                className="text-2xl font-bold text-gray-700 hover:text-gray-900 focus:outline-none"
                type="button"
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Overlay;
