import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './views/PublicPage/LoginPage'
import './App.css'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
