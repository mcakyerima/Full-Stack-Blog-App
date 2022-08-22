import React, { useState, useEffect} from 'react'
import { FeaturedPostsCard } from '../components';
import { getFeaturedPost } from '../services';
import Slider from "react-slick"



// making carousel responsive

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: false,
        dots: true,
        
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 810,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 2,
        infinite:true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite:true
      }
    }
  ]
};


const FeaturedPosts = () => {
  const [featuredPost, setFeaturedPost] = useState([]);
  // check if carousel data fetched before rendering carousel
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    getFeaturedPost()
    .then((result) => {
      setFeaturedPost(result);
      setDataLoaded(true)
    })
  }, [])



  return (
    <div className="w-[80%] px-4 lg:px-0 md:px-0 mb-8">
        <Slider {...settings} >

          {dataLoaded  && featuredPost.map((post, index) => (
            <div key={index} className="px-4">
              <FeaturedPostsCard post={post} index={index}/>
            </div>
          ))}
        </Slider>
    </div>
  )
}

export default FeaturedPosts