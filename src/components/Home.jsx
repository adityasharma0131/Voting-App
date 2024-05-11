import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [inpval, setInpval] = useState({
    name: "",
    password: "",
  });

  const getdata = (e) => {
    const { value, name } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addData = (e) => {
    e.preventDefault();
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"));

    const { name, password } = inpval;

    if (!name || !password) {
      alert("Name and password fields are required");
    } else {
      if (registeredUsers && registeredUsers.length) {
        const userExists = registeredUsers.find(
          (user) => user.name === name && user.password === password
        );

        if (userExists) {
          console.log("Admin logged in successfully");
          if (userExists.userType === "admin") {
            navigate("/AdminPannel", { state: { userExists } });                                      // Navigate admin to AdminPanel

          } else if (userExists.userType === "voter") {
            navigate("/VotingPannel", { state: { userExists } });                   // Navigate voter to VotingPannel
          } else {
            alert("Invalid user type");
          }
        } else {
          alert("Invalid username or password");
        }
      } else {
        alert("No user data found. Please register first.");
      }
    }
  };

  return (
    <div className="p-6" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h1 className="text-center col mb-4" style={{ color: "#343a40" }}>Login Page</h1>
      <div className="container border rounded p-4 bg-light">
        <Form>
          <Form.Group className="col-lg-6 mb-3" controlId="formBasicEmail">
            <Form.Label>User name:</Form.Label>
            <Form.Control
              name="name"
              onChange={getdata}
              type="text"
              placeholder="Enter user name"
            />
          </Form.Group>

          <Form.Group className="col-lg-6 mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={getdata}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="dark" onClick={addData} type="submit">
            Submit
          </Button>
        </Form>
        <p className="mt-2.5">
          Don't Have a Account,{" "}
          <span>
            <NavLink to="/Register">Register</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
