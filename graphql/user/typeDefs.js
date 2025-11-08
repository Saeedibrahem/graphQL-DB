
module.exports = `
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
    comments: [Comment]
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): User
  }
`;
