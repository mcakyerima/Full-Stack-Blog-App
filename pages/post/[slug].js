import React from 'react';
import { GetPostDetails, getPosts } from '../../services';
import { PostDetails , Categories , PostWidget, Author, CommentsForm, Comments  } from '../../components'
const PostDetail = () => { 
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetails/>
                    <Author/>
                    <CommentsForm/>
                    <Comments/>
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="ralative lg:sticky top-8">
                        <PostWidget/>
                        <Categories/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticProps = async ({ params }) => {
  

    return {
        props: {
            props: posts
        }
    }

}

export default PostDetail;