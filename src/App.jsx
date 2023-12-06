import { useState } from 'react'
import './App.css'
import Layout from './layout/Layout'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially logged in

  const handleLogout = () => {
    setIsLoggedIn(false); // Update the login state upon logout
  };
  return (
    <>
    <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
    </>
  )
}

export default App
