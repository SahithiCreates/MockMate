import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Interview from './pages/Interview'
import InterviewSetup from './pages/InterviewSetup'
import Profile from './pages/Profile'
import EndInterview from './pages/EndInterview'
import History from './pages/History'
import Report from './pages/Report'


function App(){
  return(
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        
        
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/setup" element={<InterviewSetup/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/history" element={<History/>} />
        </Route>

        
        <Route path="/interview" element={<Interview/>} />
        <Route path="/endInterview" element={<EndInterview/>} />
        <Route path="/report" element={<Report/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

