import React, { Component } from "react";
import AddContactForm from "./Components/AddContactForm/AddContactForm";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import { v4 as uuidv4 } from "uuid";
import storage from "./utils/storage";
import { CSSTransition } from "react-transition-group";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./App.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    name: "",
    number: "",
    book: false,
    inContact: false,
  };

  async componentDidUpdate(prevState) {
    this.addToStorage(prevState);
  }

  inputValue = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetData = () => {
    this.setState({
      name: "",
      number: "",
    });
  };

 

  formSubmit = (e) => {
    e.preventDefault();
    const contact = {
      name: this.state.name,
      number: this.state.number,
      id: uuidv4(),
    };
    const isExist = this.state.contacts.find(
      (el) => el.name === this.state.name
    );
    if (this.state.name === "" || this.state.number === "") {
      toast.configure()
      // alert("Fill the form");
      toast.error("Fill the form")
      return;
    }
    if (isExist) {
      // alert(`${this.state.name} is already in contact`);
      this.setState({
        name: "",
        number: "",
        inContact: true,
      });
      return;
    } else {
      this.setState({ contacts: [...this.state.contacts, contact] });
    }
    this.resetData();
  };

  deleteItem = (id) => {
    const deletedArr = this.state.contacts.filter((el) => el.id !== id);
    this.setState({ contacts: deletedArr });
  };

  filteredNames = () => {
    return this.state.contacts.filter((el) =>
      el.name.toLowerCase().includes(this.state.filter)
    );
  };

  takeFromStorage = () => {
    const getContact = storage.get("contact");
    if (getContact) {
      this.setState({
        contacts: getContact,
      });
    }
  };

  async componentDidMount() {
    this.takeFromStorage();
    this.setState({
      book: true,
    });
  }

  addToStorage = (prevState) => {
    if (prevState !== this.state.contacts) {
      storage.save("contact", this.state.contacts);
    }
  };

  toggleAlert = () => {
    this.setState({
      inContact: false
    })
  }

  render() {
    const { name, contacts, filter, number } = this.state;

    return (
      <div className="overlay">
        <CSSTransition
          in={this.state.inContact}
          classNames="alert"
          timeout={250}
          mounthOnEnter
          unmountOnExit
        >
          <div className="alert" onClick={this.toggleAlert}>Already in contact</div>
        </CSSTransition>
        <CSSTransition
          in={this.state.book}
          classNames="phonebook"
          timeout={{ enter: 500 }}
        >
          <h1 className="phonebook">Phonebook</h1>
        </CSSTransition>

        <AddContactForm
          formSubmit={this.formSubmit}
          inputValue={this.inputValue}
          name={name}
          number={number}
        />
        <h2 className="phonebook">Contact List</h2>
        <Filter inputValue={this.inputValue} filter={filter} />
        <ContactList
          contacts={contacts}
          filteredNames={this.filteredNames}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}

export default App;
