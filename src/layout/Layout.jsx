import React , { useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Routers from '../routers/Routers'

function Layout() {
  return (
    <>
    <div className="layout-wrapper landing">
    <Header/>
    <Routers />
    <Footer />
    </div>
    </>
  )
}

export default Layout