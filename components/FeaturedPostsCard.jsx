import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image'

const FeaturedPostsCard = ({post , index}) => {
  return (
    <div className="ralative h-72 rounded-lg" >
        <div className="relative rounded-lg bg-no-repeat bg-center shadow-md inline-block w-full h-72" style={{backgroundImage: `url(${post.featured_image.url})`}}>
            <div className='absolute rounded-lg bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72 '>
                <div className="flex flex-col items-center justify-center rounded-lg p-4 absolute w-full h-full ">
                    <p className="font-semibold text-sm text-shadow mb-4 text-white ">
                        {moment(post.createdAt).format("MMM DD, YYYY")}
                    </p>
                    <p className="font-semibold text-xl mb-4 text-shadow text-white text-center">
                        {post.title}
                    </p>
                    <div className="flex items-center  absolute bottom-5 w-full justify-center">
                        <Image
                            unoptimized
                            alt={post.author.name}
                            src={post.author.photo.url}
                            height="35px"
                            width="35px"
                            className="rounded-full align-middle drop-shadow-lg z-10"
                        />
                        <p className="align-middle inline text-white text-shadow font-semibole text-md pl-2">
                            {post.author.name}
                        </p>
                    </div>
                    <Link href={`/post/${post.slug}`}><span className="cursor-pointer h-full w-full"></span></Link>
                </div>
            </div>

        </div>
    </div>
  )
}

export default FeaturedPostsCard;