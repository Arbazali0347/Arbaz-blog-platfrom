import React from 'react'
import { assets } from '../assets/assets'


const Footer = () => {
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
            <div className="md:flex-row gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div className='md:flex items-center md:justify-between justify-center flex flex-col'>
                    <img alt="logo" className="w-32 sm:w-44" src={assets.logo} />
                    <p className="max-w-[410px] mt-6 text-center">Welcome to Arbaz Bloging platform, a space where we share tips, stories, and insights on technology, lifestyle, and learning.</p>
                </div>
            </div>
            <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2025 © QuickBlog GreatStack - All Right Reserved.</p>
        </div>
    )
}

export default Footer