import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from 'axios';
import "../index.css";

export default function Form () {

  const [post, setPost] = useState([]);

  const [users, setUsers] = useState([])
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    terms: false
  });

  const [buttonDisabled, setButton] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  })

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("Invalid email address").required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
    terms: yup.boolean().oneOf([true])
  })

  useEffect(() => {
    formSchema.isValid(user).then(validForm => {
      setButton(!validForm)
    })
  }, [user])

  const submitForm = event => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", user)
      .then(response => {
        setPost(response.data)
        setUser({
          name: "",
          email: "",
          password: "",
          terms: true
        })
      })
      .catch(err => console.log(err.message))
  }

  

  const validateChange = event => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(validInput => {
        setErrors({
          ...errors,
          [event.target.name]: ""
        })
      })
      .catch(err => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0]
        })
      })
  }

  const inputChange = event => {
    event.persist();

    const newFormData = {
      ...user,
      [event.target.name]: event.target.value
    }
    validateChange(event)
    setUser(newFormData);
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <h1>Sign Up</h1>
        <label htmlFor="name" className="fLabel">
          Name
          <input 
            id="name" 
            onChange={inputChange}
            value={user.name} 
            name="name" 
            type="text" 
            className="textInput" 
          />
          {errors.name.length > 0 ? <p>{errors.name}</p> : null}
        </label>

        <label htmlFor="email" className="fLabel">
          Email
          <input 
            id="email" 
            onChange={inputChange} 
            value={user.email} 
            name="email" 
            type="textbox" 
            className="textInput" 
          />
          {errors.email.length > 0 ? <p>{errors.email}</p> : null}
        </label>

        <label htmlFor="password" className="fLabel">
          Password
          <input 
            id="password" 
            onChange={inputChange} 
            value={user.password} 
            name="password" 
            type="textbox" 
            className="textInput" 
          />
          {errors.password.length > 0 ? <p>{errors.password}</p> : null}
        </label>

        <label htmlFor="terms" className="terms">
          <input 
            id="terms" 
            value={user.terms}
            name="terms"
            type="checkbox" 
          />
          Terms of Service
        </label>
        {errors.terms.length > 0 ? <p>{errors.terms}</p> : null}
        
        <button>
          Submit
        </button>
      </form>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </>
  )
}