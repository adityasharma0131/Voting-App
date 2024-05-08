import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  
  const [inpval, setInpval] = useState({
      name: "",
      password: "",
      email: "",
      phone: "",
      userType: "voter",
      hasVoted: "false",
    });
    
    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem("registeredUsers");
        return storedData ? JSON.parse(storedData) : [];
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
      const { name, password, email, phone, userType, hasVoted } = inpval;
      
      if (!name || !password || !email || !phone) {
          alert("All fields are required");
        } else {
            const newUser = { name, password, email, phone, userType, hasVoted };
      const updatedData = [...data, newUser];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedData));
      setData(updatedData);
      setInpval({
          name: "",
          password: "",
          email: "",
          phone: "",
          userType: "voter",
          hasVoted: "false",
        });
        console.log("Data Added Successfully");
        navigate('/');
    }
};

return (
    <div className="p-6">
      <h1 className="text-center">Registration Page</h1>
      <div className="container border-2 p-4">
        <Form>
          <Form.Group className="col-lg-6 mb-3" controlId="formBasicName">
            <Form.Label>User name:</Form.Label>
            <Form.Control
              name="name"
              value={inpval.name}
              onChange={getdata}
              className="text-warning"
              type="text"
              placeholder="Enter User Name"
              />
          </Form.Group>

          <Form.Group className="col-lg-6 mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              value={inpval.password}
              onChange={getdata}
              className="text-warning"
              type="password"
              placeholder="Enter Password"
              />
          </Form.Group>

          <Form.Group className="col-lg-6 mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name="email"
              value={inpval.email}
              onChange={getdata}
              className="text-warning"
              type="email"
              placeholder="Enter Email Address"
            />
          </Form.Group>

          <Form.Group className="col-lg-6 mb-3" controlId="formBasicPhone">
            <Form.Label>Phone no</Form.Label>
            <Form.Control
              name="phone"
              value={inpval.phone}
              onChange={getdata}
              className="text-warning"
              type="text"
              placeholder="Enter Phone Number"
            />
          </Form.Group>

          <Form.Group style={{ display: "none" }}>
            <Form.Control
              name="userType"
              value={inpval.userType}
              onChange={getdata}
              type="text"
            />
          </Form.Group>

          <Form.Group style={{ display: "none" }}>
            <Form.Control
              name="hasVoted"
              value={inpval.hasVoted}
              onChange={getdata}
              type="text"
            />
          </Form.Group>

          <Button variant="warning" onClick={addData} type="submit">
            Submit
          </Button>
        </Form>
        <p className="mt-2.5">
          Already Have an Account? <NavLink to="/">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
