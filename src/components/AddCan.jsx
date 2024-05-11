import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";

const AddCan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    if (location.state && location.state.userExists) {
      setUserExists(location.state.userExists);
    }

    // Retrieve candidates data from localStorage
    const storedCandidates = localStorage.getItem("Candidates");
    const parsedCandidates = storedCandidates
      ? JSON.parse(storedCandidates)
      : [];
    setCandidates(parsedCandidates);
  }, [location.state]);

  const [inpval, setInpval] = useState({
    category: "",
    name: "",
    party: "",
    votes: 0,
  });

  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("Candidates");
    return storedData ? JSON.parse(storedData) : [];
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

  const getdata = (e) => {
    const { value, name } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addData = (e) => {
    e.preventDefault();
    const { name, party, votes, category } = inpval;
    if (name === "" || party === "" || category === "") {
      alert("All fields are required");
    } else {
      const newUser = { name, party, votes, category };
      const updatedData = [...data, newUser];
      localStorage.setItem("Candidates", JSON.stringify(updatedData));
      setData(updatedData);
      setInpval({
        category: "",
        name: "",
        party: "",
        votes: 0,
      });
      console.log("Candidate Added Successfully");
      window.location.reload();
    }
  };

  const Back = () => {
    navigate("/AdminPannel", { state: { userExists } });
  };

  return (
    <>
      <div className="container py-4">
        {userExists ? (
          <div className="text-center">
            <h2 className="mb-4">Add Candidate, {userExists.name}!</h2>
            <div className="card">
              <div>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" onClick={Back} className="m-2">
                    Back
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    className="m-2"
                  >
                    Logout
                  </Button>
                </div>
              </div>
              <div className="card-body">
                <h3 className="card-title">Candidate Form</h3>
                <Form>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th className="bg-dark text-warning">Category</th>
                        <th className="bg-dark text-warning">Candidate</th>
                        <th className="bg-dark text-warning">Country</th>
                        <th className="bg-dark text-warning">Add</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="bg-dark text-warning">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCCat"
                          >
                            <Form.Label>Candidate Category:</Form.Label>
                            <Form.Select
                              name="category"
                              className="bg-dark text-warning"
                              value={inpval.category}
                              onChange={getdata}
                            >
                              <option value="" disabled>
                                Select Category
                              </option>
                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                              <option value="option3">Option 3</option>
                            </Form.Select>
                          </Form.Group>
                        </td>

                        <td className="bg-dark text-warning">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCName"
                          >
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
                        <td className="bg-dark text-warning">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPName"
                          >
                            <Form.Label>Country name:</Form.Label>
                            <Form.Control
                              name="party"
                              value={inpval.party}
                              onChange={getdata}
                              className="text-warning"
                              type="text"
                              placeholder="Enter Country Name"
                            />
                          </Form.Group>
                        </td>

                        <td className="bg-dark text-warning">
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

      <div className="container py-4 pb-3">
  {userExists ? (
    <div className="text-center">
      {candidates.map((candidate, index) => (
        <div key={index} className="card">
          <div className="d-flex justify-content-end m-2"></div>
          <div className="card-body">
            <h5 className="card-title">{candidate.category}</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="bg-dark text-warning">Category</th>
                  <th className="bg-dark text-warning">Candidate</th>
                  <th className="bg-dark text-warning">Country</th>
                  <th className="bg-dark text-warning">Votes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-warning text-dark">{candidate.category}</td>
                  <td className="bg-warning text-dark">{candidate.name}</td>
                  <td className="bg-warning text-dark">{candidate.party}</td>
                  <td className="bg-warning text-dark">{candidate.votes}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-end m-2">
            {/* <Button variant="primary">
                  <NavLink to='/AddCan'>Add Candidate</NavLink>
              </Button> */}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center">
      <p>Please Login</p>
    </div>
  )}
</div>

    </>
  );
};

export default AddCan;
