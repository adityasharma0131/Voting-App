import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Head';
import Home from './components/Home';
import Register from './components/Register';
import VotingPannel from './components/VotingPannel';
import AdminPannel from './components/AdminPannel';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import AddCan from './components/AddCan';


const App = () => {
  return (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/VotingPannel' element={<VotingPannel />} />
      <Route path='/AdminPannel' element={<AdminPannel />} />
      <Route path='/AddCan' element={<AddCan />} />
    </Routes>
    {/* <Register /> */}
  </BrowserRouter>
  )
}

export default App;