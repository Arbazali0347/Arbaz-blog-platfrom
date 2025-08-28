import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets'
import Moment from 'moment'
import Footer from '../Components/Footer'
import Loader from '../Components/Loader'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const Blog = () => {
  const { id } = useParams()

  const { axios } = useAppContext()

  const [data, setData] = useState(null)
  const [Comments, setComments] = useState([])
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blogId: id })
      console.log(data.comments)
      if (data.success) {
        setComments(data.comments)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const addComments = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", { blog: id, name, content })
      console.log(data)
      if (data.success) {
        toast.success(data.message)
        setName("")
        setContent("")
        fetchComments()
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [])


  return data ? (
    <div>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
      <Navbar />
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format("MMMM Do YYYY")}</p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Arbaz Ali</p>
      </div>
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="" className='rounded-3xl mb-5' />
        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: data.description }}></div>

        {/* Comment Part */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comments {Comments.length}</p>
          <div className='flex flex-col gap-4'>
            {Comments.map((item, index) => (
              <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.user_icon} alt="" className='w-6' />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-sm'>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comments Part */}
        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Add Comments</p>
          <form onSubmit={addComments} className="flex flex-col items-start gap-4 max-w-lg">
            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" required className="w-full p-2 border border-gray-300 rounded outline-none" type="text" />
            <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder="Comment" className="w-full p-2 border border-gray-300 rounded outline-none h-48" required></textarea>
            <button type="submit" className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer">Submit</button>
          </form>
        </div>

        {/* Share Buttons */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className="font-semibold my-4">Share this article on social media</p>
          <div className='flex gap-4'>
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.facebook_icon} alt="Facebook" width={50} />
            </a>
            {/* Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent("Check out this blog!")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.twitter_icon} alt="Twitter" width={50} />
            </a>

            {/* Google+ (Note: Google+ ab band ho gaya hai, to iski jagah LinkedIn add karna best hoga) */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.googleplus_icon} alt="LinkedIn" width={50} />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  ) : <Loader />
}

export default Blog