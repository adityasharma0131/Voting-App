import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useLocation, useNavigate } from "react-router-dom";

const AdminPanel = () => {
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
    const parsedCandidates = storedCandidates ? JSON.parse(storedCandidates) : [];
    setCandidates(parsedCandidates);
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("userDetail");
    navigate("/");
  };

  const AddCan = () => {
    navigate("/AddCan", { state: { userExists } });
  };

  // Function to group candidates by category
  const groupCandidatesByCategory = () => {
    const groupedCandidates = {};
    candidates.forEach(candidate => {
      if (!groupedCandidates[candidate.category]) {
        groupedCandidates[candidate.category] = [];
      }
      groupedCandidates[candidate.category].push(candidate);
    });
    return groupedCandidates;
  };

  return (
    <div className="container py-4 pb-3">
      {userExists ? (
        <div className="text-center">
          <h2 className="mb-4">
            Welcome to the Admin Panel, {userExists.name}!
          </h2>
          <div className="d-flex justify-content-end m-2">
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          {Object.entries(groupCandidatesByCategory()).map(([category, categoryCandidates]) => (
            <div key={category}>
              <h3>{category}</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="bg-dark text-warning">Candidate</th>
                    <th className="bg-dark text-warning">Country</th>
                    <th className="bg-dark text-warning">Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryCandidates.map((candidate, index) => (
                    <tr key={index}>
                      <td className="bg-warning text-dark">{candidate.name}</td>
                      <td className="bg-warning text-dark">{candidate.party}</td>
                      <td className="bg-warning text-dark">{candidate.votes}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
          <div className="d-flex justify-content-end m-2">
            <Button variant="primary" onClick={AddCan}>Add Candidate</Button>
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

export default AdminPanel;
