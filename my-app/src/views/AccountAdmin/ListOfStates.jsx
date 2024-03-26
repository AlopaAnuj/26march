import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminHome from './AdminHome';
import ListCondidates from './ListCondidates';
import { useState } from 'react'

function ListOfStates() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  return (
    <div className="ListOfStates">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminHome email={userName} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/listofcondidates/:stateId" element={<ListCondidates setLoggedIn={setLoggedIn} setUserName={setUserName} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default ListOfStates;
