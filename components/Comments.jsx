import React, {useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import { getComments } from '../services';

const Comments = ({slug}) => {
  const [postComments, setPostComments] = useState([]);
  
  useEffect(() => {
    getComments(slug).then((results) => setPostComments(results))
  },[])

  return (
    <>
      {postComments.length && (

        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 lg:mr-10">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            { postComments.length}
            {" "}
            {postComments.length === 1 ? "Comment" : "Comments" }
          </h3>
          {postComments.map((comment) => (
            <div key={comment.createdAt} className="border-b border-gray-100 mb-5 pb-5">
              <p className="mb-5">
                <span className="font-semibold">{comment.name}</span>
                {" "}
                on
                {" "}
                {moment(comment.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className="whitespace-pre-line text-gray-600">
                  {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments