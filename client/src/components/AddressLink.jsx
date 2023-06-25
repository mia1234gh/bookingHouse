import React from "react";

const AddressLink = ({ children, className = null }) => {
  if (!className) {
    className = "my-3 block";
  }
  className += "flex flex-row gap-1 font-semibold text-sm underline";

  return (
    // open links in a new tab every time.

    <a
      href={`https://maps.google.com/?q=${children}`}
      className="flex flex-row gap-1  text-sm underline justify-end"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>

      <div>{children}</div>
    </a>
  );
};

export default AddressLink;
