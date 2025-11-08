
const userTypeDefs = require('./user/typeDefs');
const postTypeDefs = require('./post/typeDefs');
const commentTypeDefs = require('./comment/typeDefs');

const baseTypeDefs = `
  type Query {
    _:
Boolean
  }

  type Mutation {
    _:
Boolean
  }
`;

module.exports = [baseTypeDefs, userTypeDefs, postTypeDefs, commentTypeDefs];
