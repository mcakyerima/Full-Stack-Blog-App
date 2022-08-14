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
