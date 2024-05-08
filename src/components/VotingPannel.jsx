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
    // Parse the retrieved data if it exists
    const parsedCandidates = storedCandidates
      ? JSON.parse(storedCandidates)
      : [];
    // Update the state with the retrieved candidates
    setCandidates(parsedCandidates);

    // Retrieve registeredUsers from localStorage
    const storedRegisteredUsers = localStorage.getItem("registeredUsers");
    const parsedRegisteredUsers = storedRegisteredUsers
      ? JSON.parse(storedRegisteredUsers)
      : [];
    setRegisteredUsers(parsedRegisteredUsers);
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("userDetail");
    navigate("/");
  };

  const addData = (e) => {
    e.preventDefault();
    const selectedCandidateIndex = parseInt(inpval.vote); // Get the index of the selected candidate
    if (
      isNaN(selectedCandidateIndex) ||
      selectedCandidateIndex < 0 ||
      selectedCandidateIndex >= candidates.length
    ) {
      alert("Please select a valid candidate!");
    } else {
      // Update the vote count of the selected candidate
      const updatedCandidates = candidates.map((candidate, index) => {
        if (index === selectedCandidateIndex) {
          return {
            ...candidate,
            votes: candidate.votes ? candidate.votes + 1 : 1,
          };
        }
        return candidate;
      });
      localStorage.setItem("Candidates", JSON.stringify(updatedCandidates)); // Update the candidates data in localStorage
      setCandidates(updatedCandidates); // Update the state with the updated candidates

      // Update hasVoted in registeredUsers
      const updatedRegisteredUsers = registeredUsers.map((user) => {
        if (user.name === userExists.name) {
          return { ...user, hasVoted: "true" };
        }
        return user;
      });
      localStorage.setItem(
        "registeredUsers",
        JSON.stringify(updatedRegisteredUsers)
      );
      setRegisteredUsers(updatedRegisteredUsers);
      alert("Vote submitted successfully!");
      navigate("/");

    }
  };

  return (
    <div className="container py-4">
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
                        <td className="bg-warning text-dark">
                          {candidate.name}
                        </td>
                        <td className="bg-warning text-dark">
                          {candidate.party}
                        </td>
                        <td className="bg-warning text-dark">
                          <Form.Check
                            type="radio"
                            name="vote"
                            value={index.toString()} // Set the value to the index of the candidate
                            onChange={(e) =>
                              setInpval({ ...inpval, vote: e.target.value })
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="d-flex justify-content-end m-2">
                {/* Render the submit button conditionally based on hasVoted status */}
                {!userExists.hasVoted || userExists.hasVoted === "false" ? (
                  <Button variant="success" onClick={addData}>
                    Submit
                  </Button>
                ) : (
                  <Button variant="success" disabled>
                    Already Voted
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
