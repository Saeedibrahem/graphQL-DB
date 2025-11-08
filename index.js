const { ApolloServer } = require('@apollo/server');
const connectDB = require('./config/db');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { authenticate } = require('./utils/auth');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

connectDB();
startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    let user = null;
    try {
      user = await authenticate(req);
    } catch (error) {
      // إذا لم يكن هناك توكن أو كان غير صحيح، نترك user = null
      // الـ resolvers ستحقق من ذلك
    }
    return { user };
  },
}).then(({ url }) => {
  console.log(` Server ready at ${url}`);
});