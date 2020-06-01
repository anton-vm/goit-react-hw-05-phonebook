import React from "react";
import PropTypes from 'prop-types'
import {CSSTransition, TransitionGroup } from 'react-transition-group'

const ContactList = ({ contacts, filteredNames, deleteItem }) => {

  return (
    <>
      {contacts.length > 2 ? (
        <TransitionGroup component="ul" className="list">
          {filteredNames().map((el) => (
            <CSSTransition classNames="listItem" timeout={300} key={el.id}>
            <li  className='listItem'>
            <div className="listName">{el.name}</div> <div className="listName">{el.number}</div> 
              <button onClick={() => deleteItem(el.id)} className="deletBtn">X</button>
            </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <TransitionGroup component="ul" className="list" >
          {contacts.map((el) => (
            <CSSTransition classNames="listItem" timeout={300}>
            <li key={el.id} className='listItem'>
              <div className="listName">{el.name}</div> <div className="listName">{el.number}</div> 
              <button onClick={() => deleteItem(el.id)} className="deletBtn">X</button>
            </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </>
  );
  ContactList.propTypes ={ 
    contacts: PropTypes.arrayOf({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
    filteredNames: PropTypes.func, 
    deleteItem: PropTypes.func,
  }
};

export default ContactList;
