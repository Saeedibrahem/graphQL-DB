
module.exports = `
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }

  type Query {
    comments: [Comment]
    comment(id: ID!): Comment
  }

  type Mutation {
    createComment(text: String!, post: ID!): Comment
    updateComment(id: ID!, text: String): Comment
    deleteComment(id: ID!): Comment
  }
`;
