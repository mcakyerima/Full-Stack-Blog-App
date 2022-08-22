import moment from 'moment';
import Link from 'next/link';
import { off } from 'process'
import React, { useState, useEffect } from 'react';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories , slug}) => {
  const [relatedPost, setRelatedPost] = useState([])

  // check if we are currently viewing a post or we are on
  // viewing a particular post via slug in our url...
  // if we are currently viewing a post? we show related posts
  // else we shoow Recent posts using a useEffect hook

  useEffect(() => {
    // check for slug
    if(slug) {
      getSimilarPosts(categories, slug)
        .then((results) => setRelatedPost(results))
    } else {
      getRecentPosts()
        .then((result) => setRelatedPost(result))
    }
  }, [slug])


  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mg-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        { slug ? 'Related Post' : "Recent Post"}
      </h3>
      { relatedPost.map((post) => (
        <div key={post.title} className="flex item-center  w-full mb-4">
            <div className="w-16 flex-none">
                <img
                  height="60px"
                  width="60px"
                  src={post.featured_image.url}
                  className="align-middle rounded-full"
                />
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">
                {moment(post.createdAt).format("MMM DD, YYYY")}
                
              </p>
              <Link href={`/post/${post.slug}`} key={post.title} className="text-md">
                  {post.title}
                </Link>
            </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget;