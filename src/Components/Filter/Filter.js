import React from "react";
import PropTypes from "prop-types"

const Filter = ({ inputValue,  }) => {
  return (
    <div className="block">
      <p className="label">Find contacts by name</p>
      <input
        type="text"
        onInput={inputValue}
        name="filter"/>
    </div>
  );
  Filter.propTypes ={
    inputValue:PropTypes.func.isRequired,

  }

};

export default Filter;
