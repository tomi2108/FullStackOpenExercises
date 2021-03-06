const db = require("./db");
const { ApolloServer } = require("apollo-server");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const JWT_SECRET = "THIS_IS_A_SECRET_WORD";

db.then(() => {
  console.log("connected to MongoDb");
}).catch((err) => {
  console.error("error connecting to MongoDb", err.message);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
    return null;
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
