import React from 'react'
import Image from 'next/image'

const Author = ({ author }) => {
  return (
    <div className="text-center rounded-lg mt-20 mb-8 p-12 lg:mr-10 relative bg-black bg-opacity-30">
      <div className="absolute left-0 right-2 -top-14">
          <Image
            unoptimized
            alt={author.name}
            height='100px'
            width='100px'
            className='align-middle rounded-full-fit'
            src={author.photo.url}
          />
          
      </div>
      <h3 className="text-white   text-xl font-bold">{author.name}</h3>
          <p className="text-white text-lg">{author.description}</p>
    </div>
  )
}

export default Author