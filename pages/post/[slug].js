import React from 'react';
import { useRouter } from 'next/router'
import { getPostDetails, getPost } from '../../services';
import { PostDetails , Categories , PostWidget, Author, CommentsForm, Comments, Loader  } from '../../components'



const PostDetail = ({post}) => { 
    const router = useRouter();

    if (router.isFallback) {
        return <Loader/>
    }
    return (
        <div className="container mx-auto lg:px-10 md:px-8 px-5 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetails post={post}/>
                    <Author author={post.author}/>
                    <CommentsForm slug={post.slug}/>
                    <Comments slug={post.slug}/>
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="ralative lg:sticky top-8">
                        <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)}/>
                        <Categories/>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default PostDetail;

export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug);
    return {
        props: { post: data}
    }

}

// get StaticProps cannot prerender dynamic routes we are collecting
// from our routes, so we need to give next js all the posible routes
// routes that we are going so that it prerenders it before static rendering
// so since we are using the SLUG dynamically, we will fetch all data from our CMS 
// and map through the slugs and pass it to the params of getStaticPaths function which
// will be used by the above getStaticProps functions params.
export async function getStaticPaths(){
    // fetch all post and get all slugs
    const posts = await getPost()
     return {
        // destructure the post and node 
        //  and get all slugs then , save slugs in paths object acording to NExtjs docs
        paths: posts.map(({node: { slug}}) => ({params: { slug}})),
        fallback: false
     }
}