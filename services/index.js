// services is used to fetch data from graph cms
// using graph graph-request package

import { request , gql } from 'graphql-request';

// create a graphql api process 
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPost = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                description
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featured_image {
                url
              }
              categories {
                name
                slug
              }
              
            }
          }
        }
      }
    `
    const result = await request(graphqlAPI, query)
    
    return result.postsConnection.edges;
};

// get Post Details
export const getPostDetails = async (slug) => {
  const query = gql`
  query GetPostDetails($slug: String!) {
    post(where: { slug: $slug}) {
            author {
              description
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featured_image {
              url
            }
            categories {
              name
              slug
            }
            content {
              raw
            }
          }
        }
  `
  const result = await request(graphqlAPI, query , {slug})
  
  return result.post;
};


// get recent post
export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails() {
    posts(
      orderBy: createdAt_ASC,
      last: 3
      ) {
        title
        featured_image {
          url
        }
        createdAt
        slug
      }
  }
  `

const result = await request(graphqlAPI, query)
return result.posts
};

// get Simlar post query
// in graphQl we pass parameters with dollar sign
// and the parameter name and semicolon and the data type
// our category is actuall an array of strings

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featured_image {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};



// get Categories
export const getCategories = async () => {
  const query = gql`
  query getCategories {
    categories {
      name
      slug
    }
  }
  `
  const result = await request(graphqlAPI, query)
  return result.categories
}

// submit comment to graph cms
export const submitComment = async (obj) => {
  // post comment to our Nextjs Api backend
  const result = await fetch('/api/comments/comment' , {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify(obj)})
  return result.json();
}

// fetch coments

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug }}) {
        name
        createdAt
        comment

      }
    }`
 const result = await request(graphqlAPI, query, {slug});
 return result.comments;
}

// get fetured post
export const getFeaturedPost = async () => {
  const query = gql`
    query GetFeaturedPost() { 
      posts(where: {featuredPost: true}){
        author { 
          name 
          photo {
            url
          }
        }
        featured_image{
          url
        }
        title
        slug
        createdAt
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.posts;
}

// get Category Post 
export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              description
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featured_image {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};