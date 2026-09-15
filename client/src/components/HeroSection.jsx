import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Calendar, CalendarIcon, ClockIcon } from 'lucide-react'
import backgroundImage from '../assets/backgroundImage.jpg'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate
  return (
    <div  className='min-h-screen flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <img src ={assets.marvelLogo} alt="" className="max-h-11 lg:h-11 mt-24" />

        <h1 className='text-5xl md:text-[66px] leading-tight font-semibold'>Spider-Man:<br />Brand New Day</h1>

        <div className='flex items-center gap-4 text-gray-300'>
            <span> Action | Adventure | Sci-Fi</span>
            <div className='flex items-center gap-1'>
                <CalendarIcon className='w-4.5 h-4.5' /> 2026
            </div>
            <div className='flex items-center gap-1'>
                <ClockIcon className='w-4.5 h-4.5' /> 2h 30m
            </div>
        </div>
        <p  className='max-w-md text-gray-300'>Peter Parker devotes his life to protecting New York City as a full-time Spider-Man. But as the demands on him intensify, the pressure sparks a surprising physical evolution that threatens his existence, even as a strange new pattern of crimes gives rise to one of the most powerful threats he's ever faced.</p>
        <button onClick={()=>navigate('/movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
            Explore Movies 
            <ArrowRight className="w-5 h-5"/>
        </button>

    </div>
  )
}

export default HeroSection