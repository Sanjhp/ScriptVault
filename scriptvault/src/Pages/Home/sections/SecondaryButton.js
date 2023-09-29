import React from "react";
import { Link } from "react-router-dom";

const SecondaryButton = ( {to , name}) => {
  return (
    <div className="bg-black px-3 py-3 text-white rounded hover:bg-white hover:text-black hover:border-[1px] hover:border-black hover:border-solid">
      <Link to={to}>{name}</Link>
    </div>
  );
};

export default SecondaryButton;
