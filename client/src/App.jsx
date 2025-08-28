import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import Layout from './Pages/admin/Layout'
import AddBlog from './Pages/admin/AddBlog'
import Comments from './Pages/admin/Comments'
import ListBlog from './Pages/admin/ListBlog'
import Login from './Components/admin/Login'
import Dashboard from './Pages/admin/Dashboard'
import "quill/dist/quill.snow.css"
import { Toaster } from "react-hot-toast"

import AiChatBot from './Components/AiChatBot'
import { useAppContext } from './context/AppContext'


function App() {
  const [count, setCount] = useState(0)

  const { token } = useAppContext();

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />

        {/* _________ Admin________________*/}
        <Route path="/admin" element={token ? <Layout /> : <Login />}>

          <Route index element={<Dashboard />} />
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='listBlog' element={<ListBlog />} />
          <Route path='comments' element={<Comments />} />
        </Route>
      </Routes>
      <AiChatBot />
    </div>
  )
}

export default App
