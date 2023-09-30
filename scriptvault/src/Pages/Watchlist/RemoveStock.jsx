// RemoveStock.jsx

import React from "react";

const RemoveStockButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="remove-button">
      <i className="fa fa-trash-o" aria-hidden="true"></i>
    </button>
  );
};

export default RemoveStockButton;