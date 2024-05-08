import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="text-warning" href="#home">Voting System</Navbar.Brand>
        </Container>
      </Navbar>
  );
};

export default Header;


// import React from "react";
// import Navbar from 'react-bootstrap/Navbar'
// import Container from 'react-bootstrap/Container'
// import Nav from 'react-bootstrap/Nav'
// import { NavLink } from 'react-router-dom';

// const Header = () => {
//   return (
//     <Navbar bg="dark" variant="dark">
//       <Container>
//         <Navbar.Brand className="text-warning"><NavLink to='/'>Voting System</NavLink></Navbar.Brand>
//         <Nav className="me-auto">
//           <Nav.Link><NavLink to='/'>Home</NavLink></Nav.Link>
//           <Nav.Link><NavLink to='/login'>Login</NavLink></Nav.Link>
//           <Nav.Link><NavLink to='/register'>Register</NavLink></Nav.Link>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;

