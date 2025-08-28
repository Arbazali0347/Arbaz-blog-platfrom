import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import Bloglist from '../Components/Bloglist'

import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <Bloglist/>
        <Footer/>
    </div>
  )
}

export default Home