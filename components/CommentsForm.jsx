import React, { useState, useEffect, useRef} from 'react'
import { submitComment } from '../services';

const CommentsForm = ( { slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentElem = useRef()
  const nameElem = useRef()
  const emailElem = useRef()
  const storeDataElem = useRef()

  // useEffect hook to check for local storage once app starts
  useEffect(() => {
      nameElem.current.value = window.localStorage.getItem('name');
      emailElem.current.value = window.localStorage.getItem('email');
    },[]);


  // handle comment submit
  const handleCommentSubmit = () => {
    // set Error to false intially
    setError(false);
    // check if input has no value using the  useRef and desstucture
    const { value: comment } = commentElem.current;
    const { value: email } = emailElem.current;
    const { value: name } = nameElem.current;
    const { checked : storeData } = storeDataElem.current;

    if( !comment || !name || !email ) {
      setError(true)
      return;
    }

    // otherwise form the comment object
    const commentObj = { name, email, comment, slug }
    if(storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    }else {
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)

    }
    submitComment(commentObj)
      .then((res) => {
        setShowSuccessMessage(true)
      })
      // show success message for 3 seconds then disappear
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000);

  }
  
  return (
    <div className="bg-white shadow-lg rounded-lg lg:mr-10 p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-5">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea 
          ref={commentElem}
          className="p-5 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-600"
          placeholder="comment"
          name="comment" />
      </div> 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4">
          <input 
            type="text"
            ref={nameElem}
            className="py-2 px-5 outline-none w-full rounded-lg  focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-600"
            placeholder="name"
            name="name" 
          />
          <input 
            type="text"
            ref={emailElem}
            className="py-2 px-5 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-600"
            placeholder="email"
            name="email" 
          />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataElem}
            type="checkbox"
            id="storeData"
            name="storeData"
            value='true'
          />
          <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Save my name and e-mail for next time I comment.</label>
        </div>
      </div>
      {error && <p className=" text-xs text-red-500">All Fields are required.</p>}
      <div className="mt-8">
        <button 
          type="button"
          className="transition duration-500 hover:bg-indigo-500 inline-block bg-cyan-600 text-lg rounded-full text-white px-8 py-3 sm:py-2 sm:px-5 cursor-pointer "
          onClick={handleCommentSubmit}
          >
            Post Comment
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500"> Comment submitted for review</span>}       
      </div>
    </div>

  )
}

export default CommentsForm