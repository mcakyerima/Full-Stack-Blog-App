// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GraphQLClient , gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const graphCmsToken = process.env.GRAPHCMS_TOKEN

export default async function comments(req,res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: { authorization: `Bearer ${graphCmsToken}`}
    });
    // comments mutaion query { mutaion in graphcms means add data to a preexisting data}
    const query = gql`
    mutation CreateComment($name: String! , $email: String! , $comment: String!, $slug: String!) {
      createComment(data : { name : $name, email: $email, comment: $comment, post: { connect: { slug: $slug}}}) { id}
    }
    `

    // now get the results
    // req.body contains all our { name, email, comment , slug} object,
    // so we just pass the req.body itself as the second parameter
    // return the result to our front end

    try {
      const result = await graphQLClient.request(query, req.body)

      return res.status(200).send(result) 

    } catch (error) {
      res.status(500).send(error);
      console.log(error)
    }
} 