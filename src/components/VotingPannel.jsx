import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";

const VotingPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const [inpval, setInpval] = useState({
    vote: "", // Set the default value for userType
  });

  useEffect(() => {
    if (location.state && location.state.userExists) {
      setUserExists(location.state.userExists);
    }

    // Retrieve data from localStorage
    const storedCandidates = localStorage.getItem("Candidates");
    const parsedCandidates = storedCandidates ? JSON.parse(storedCandidates) : [];
    setCandidates(parsedCandidates);

    // Retrieve registeredUsers from localStorage
    const storedRegisteredUsers = localStorage.getItem("registeredUsers");
    const parsedRegisteredUsers = storedRegisteredUsers ? JSON.parse(storedRegisteredUsers) : [];
    setRegisteredUsers(parsedRegisteredUsers);
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("userDetail");
    navigate("/");
  };

  const addData = (e) => {
    e.preventDefault();
    const selectedCandidateIndex = parseInt(inpval.vote);
    if (
      isNaN(selectedCandidateIndex) ||
      selectedCandidateIndex < 0 ||
      selectedCandidateIndex >= candidates.length
    ) {
      alert("Please select a valid candidate!");
    } else {
      const updatedCandidates = candidates.map((candidate, index) => {
        if (index === selectedCandidateIndex) {
          return {
            ...candidate,
            votes: candidate.votes ? candidate.votes + 1 : 1,
          };
        }
        return candidate;
      });
      localStorage.setItem("Candidates", JSON.stringify(updatedCandidates));
      setCandidates(updatedCandidates);

      const updatedRegisteredUsers = registeredUsers.map((user) => {
        if (user.name === userExists.name) {
          return { ...user, hasVoted: "true" };
        }
        return user;
      });
      localStorage.setItem("registeredUsers", JSON.stringify(updatedRegisteredUsers));
      setRegisteredUsers(updatedRegisteredUsers);

      setUserExists({ ...userExists, hasVoted: "true" }); // Update userExists state
      alert("Vote submitted successfully!");
    }
  };

  return (
    <div className="container py-4 ">
      {userExists ? (
        <div className="text-center">
          <Form>
            <h2 className="mb-4">Welcome, {userExists.name}!</h2>
            <div className="card">
              <div className="d-flex justify-content-end m-2">
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <div className="card-body">
                <h3 className="card-title">Voting Panel</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="bg-dark text-warning">Candidate</th>
                      <th className="bg-dark text-warning">Party</th>
                      <th className="bg-dark text-warning">Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((candidate, index) => (
                      <tr key={index}>
                        <td className="bg-warning text-dark">{candidate.name}</td>
                        <td className="bg-warning text-dark">{candidate.party}</td>
                        <td className="bg-warning text-dark">
                          {!userExists.hasVoted || userExists.hasVoted === "false" ? (
                            <Form.Check
                              type="radio"
                              name="vote"
                              value={index.toString()}
                              onChange={(e) =>
                                setInpval({ ...inpval, vote: e.target.value })
                              }
                            />
                          ) : (
                            <Form.Check type="radio" disabled />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="d-flex justify-content-end m-2">
                {!userExists.hasVoted || userExists.hasVoted === "false" ? (
                  <Button className="mr-2" variant="success" onClick={addData}>
                    Submit
                  </Button>
                ) : (
                  <Button className="mr-2" variant="success" disabled>
                    You Have Already Voted
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </div>
      ) : (
        <div className="text-center">
          <p>Please Login</p>
        </div>
      )}
    </div>
  );
};

export default VotingPanel;
