
module.exports = `
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment]
  }

  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
    updatePost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): Post
  }
`;
