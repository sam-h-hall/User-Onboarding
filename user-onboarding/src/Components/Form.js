import React, { useState } from "react";
import "../index.css";

export default function Form () {
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    terms: false
  });

  const inputChange = event => {
    // event.persist();

    const newFormData = {
      ...user,
      [event.target.name]: event.target.value
    }

    setUser(newFormData);
  }

  return (
    <>
      <form>
        <h1>Sign Up</h1>
        <label htmlFor="name" className="fLabel">
          Name
          <input id="name" onChange={inputChange} value={user.name} name="name" type="text" className="textInput" />
        </label>

        <label htmlFor="email" className="fLabel">
          Email
          <input id="email" onChange={inputChange} value={user.email} name="email" type="textbox" className="textInput" />
        </label>

        <label htmlFor="password" className="fLabel">
          Password
          <input id="password" onChange={inputChange} value={user.password} name="password" type="textbox" className="textInput" />
        </label>

        <label htmlFor="terms" className="terms">
          <input id="terms" value={user.terms} type="checkbox" />
          Terms of Service
        </label>
        
        <button>Submit</button>
      </form>
    </>
  )
}