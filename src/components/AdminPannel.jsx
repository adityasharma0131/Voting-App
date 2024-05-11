import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";
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
    const parsedCandidates = storedCandidates
      ? JSON.parse(storedCandidates)
      : [];
    setCandidates(parsedCandidates);
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("userDetail");
    navigate("/");
  };

  const AddCan = () => {
    navigate("/AddCan", { state: { userExists } });
  };


  return (
    // <div className="container py-4">
    //   {userExists ? (
    //     <div className="text-center">
    //       <h2 className="mb-4">
    //         Welcome to the Admin Panel, {userExists.name}!
    //       </h2>
    //       <div className="card">
    //         <div className="d-flex justify-content-end m-2">
    //           <Button variant="danger" onClick={handleLogout}>
    //             Logout
    //           </Button>
    //         </div>
    //         <div className="card-body">
    //           <h3 className="card-title">Admin Panel</h3>
    //           <Table striped bordered hover>
    //             <thead>
    //               <tr>
    //                 <th className="bg-dark text-warning">Candidate</th>
    //                 <th className="bg-dark text-warning">Party</th>
    //                 <th className="bg-dark text-warning">Votes</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {candidates.map((candidate, index) => (
    //                 <tr key={index}>
    //                   <td className="bg-warning text-dark">{candidate.name}</td>
    //                   <td className="bg-warning text-dark">
    //                     {candidate.party}
    //                   </td>
    //                   <td className="bg-warning text-dark">
    //                     {candidate.votes}
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </Table>
    //         </div>
    //         <div className="d-flex justify-content-end m-2">
    //           {/* <Button variant="primary">
    //                         <NavLink to='/AddCan'>Add Candidate</NavLink>
    //                     </Button> */}
    //           <Button variant="primary" onClick={AddCan} >Add Candidate</Button>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="text-center">
    //       <p>Please Login</p>
    //     </div>
    //   )}
    // </div>


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
      {candidates.map((candidate, index) => (
        <div key={index} className="card">
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
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center">
      <p>Please Login</p>
    </div>
  )}
          <div className="d-flex justify-content-end m-2">
            {/* <Button variant="primary">
                  <NavLink to='/AddCan'>Add Candidate</NavLink>
              </Button> */}
          <Button variant="primary" onClick={AddCan} >Add Candidate</Button>
          </div>
</div>

  );
};






export default AdminPanel;
