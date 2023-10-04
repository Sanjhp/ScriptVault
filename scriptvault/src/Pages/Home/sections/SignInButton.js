import React from "react";
import { Link } from "react-router-dom";

const PrimaryButton = ({to , name}) => {
  return (
    <div className="bg-white-300 border-[1px] border-green-300 px-3 py-3 text-black rounded hover:bg-white hover:text-green-300 hover:border-[1px] hover:border-green-300 hover:border-solid">
      <Link to={to}>{name}</Link>
    </div>
  );
};

export default PrimaryButton;
