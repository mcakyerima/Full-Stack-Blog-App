import React from 'react'
import Image from 'next/image'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'



const Footer = () => {

  return (
    <div className="relative  shadow-lg bg-white rounded-lg p-6 mt-5 w-full mb-8">
<div className="absolute -top-6">
          <Image
            unoptimized
            alt="Mc Ak Yerima"
            height='50px'
            width='50px'
            className='align-middle rounded-full shadow-md'
            src="/Mc-kaka.jpg"
          />
          
      </div>

        <h1 className="text-md pt-3">
            Made with 💓  by <span className="font-semibold">Mc Ak Yerima</span>
        </h1>
        <h1 className="text-sm">
            <span className="font-semibold text-lg">©</span> Ai Tech Blog 2022
        </h1>
        <div className="flex gap-3 items-center mt-3">
            <a target="_blank"  href="https://www.linkedin.com/in/mohammed-abba-kaka-a69144195/" rel="noopener noreferrer">
                 <AiFillLinkedin className="text-2xl cursor-pointer hover:text-blue-500"/>
            </a>
            <a target="_blank"  href="https://github.com/mcakyerima" rel="noopener noreferrer">
                 <AiFillGithub className="text-2xl cursor-pointer hover:text-blue-300"/>
            </a>
        </div>
    </div>
  )
}

export default Footer;