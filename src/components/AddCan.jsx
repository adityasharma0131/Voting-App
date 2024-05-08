import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";

const AddCan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(null);

  const [inpval, setInpval] = useState({
    name: "",
    party: "",
    votes: 0,
  });

  useEffect(() => {
    if (location.state && location.state.userExists) {
      setUserExists(location.state.userExists);
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("userDetail");
    navigate("/");
  };

  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("Candidates");
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
    const { name, party, votes} = inpval;
    if (name === "" || party === "") {
      alert("All fields are required");
    } else {
      const newUser = { name, party , votes};
      const updatedData = [...data, newUser];
      localStorage.setItem("Candidates", JSON.stringify(updatedData)); // Changed key to "Candidates"
      setData(updatedData);
      setInpval({
        name: "",
        party: "",
        votes: 0,
      });
      console.log("Candidate Added Successfully");
    }
  };

  return (
    <div className="container py-4">
                    {userExists ? (
      <div className="text-center">
        <h2 className="mb-4">Add Candidate,  {userExists.name}!</h2>
        <div className="card">
          <div className="d-flex justify-content-end m-2">
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <div className="card-body">
            <h3 className="card-title">Candidate Form</h3>
            <Form>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="bg-dark text-warning">Candidate</th>
                    <th className="bg-dark text-warning">Party</th>
                    <th className="bg-dark text-warning">Add</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Form.Group className="mb-3" controlId="formBasicCName">
                        <Form.Label>Candidate name:</Form.Label>
                        <Form.Control
                          name="name"
                          value={inpval.name}
                          onChange={getdata}
                          className="text-warning"
                          type="text"
                          placeholder="Enter Candidate Name"
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group className="mb-3" controlId="formBasicPName">
                        <Form.Label>Party name:</Form.Label>
                        <Form.Control
                          name="party"
                          value={inpval.party}
                          onChange={getdata}
                          className="text-warning"
                          type="text"
                          placeholder="Enter Party Name"
                        />
                      </Form.Group>
                    </td>

                    <td>
                      <div className="mt-4">
                        <Button variant="success" onClick={addData}>
                          Add Candidate
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Form>
          </div>
        </div>
      </div>
      ) : (
        <div className="text-center">
          <p>Please Login</p>
        </div>
      )}
    </div>
  );
};

export default AddCan;
