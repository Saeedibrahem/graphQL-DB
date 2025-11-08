
const merge = require('lodash.merge');
const userResolvers = require('./user/resolvers');
const postResolvers = require('./post/resolvers');
const commentResolvers = require('./comment/resolvers');

module.exports = merge(userResolvers, postResolvers, commentResolvers);
