import React, { useState, useEffect, useContext} from 'react';
import Link from 'next/link'
import { getCategories } from '../services';
 

const Header = () => {

  const [categories, setCategories] = useState([]);
  
    // useEffect hook to call fetch categories once every time we open application
  useEffect(() => {
      getCategories().then((newCategory) => setCategories(newCategory))
    }, )
  return (
    <div className="container mx-auto sticky  z-20 px-10 mb-8">
        <div className="border-b-[3px] w-full inline-block  border-white-400 bg-white rounded-md px-5 py-3 mt-3 shadow-xl">
            <div className="md:float-left block">
                <Link href="/">
                    <span className="cursor-pointer font-semibold text-3xl md:text-2xl sm:text-sm text-gray-500">
                        Ai Tech Blog
                    </span>
                </Link>
            </div>
            <div className="hidden md:float-left md:contents">
                { categories.map((category, categoryIndex) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                        <span className="md:float-right mt-2 align-middle text-gray-600 ml-4 font-semibold cursor-pointer">
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Header