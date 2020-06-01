import React from "react";
import PropTypes from "prop-types";

const AddContactForm = ({ formSubmit, inputValue, name, number }) => {
  return (
    <form onSubmit={formSubmit} className="block">
      <p className="label">Name</p>
      <input type="text" onChange={inputValue} value={name} name="name"></input>
      <p className="label">Number input</p>
      <input
        type="text"
        onChange={inputValue}
        value={number}
        name="number"
      />
      <button type="submit">Add phone</button>
    </form>
  );
  AddContactForm.propTypes = {
    formSubmit: PropTypes.func.isRequired,
    inputValue: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string,
  };
};

export default AddContactForm;
