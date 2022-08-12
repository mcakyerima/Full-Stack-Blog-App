import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  
  // useEffect hook to call fetch categories once every time we open application
  useEffect(() => {
    getCategories().then((newCategory) => setCategories(newCategory))
  }, )

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mt-8 mb-8">
        <h3 className="text-xl font-semibold border-b pb-4">
          Categories
        </h3>
        { categories.map((category) => (
          <Link href={`/categories/${category.slug}`}>
              <span className="cursor-pointer pb-3 mb-2 block">
                {category.name}
              </span>
          </Link>
        )) }
    </div>
  )
}

export default Categories