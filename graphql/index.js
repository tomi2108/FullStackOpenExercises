const db = require("./db");
const { ApolloServer, gql, UserInputError, AuthenticationError } = require("apollo-server");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "THIS_IS_A_SECRET_WORD";

db.then(() => {
  console.log("connected to MongoDb");
}).catch((err) => {
  console.error("error connecting to MongoDb", err.message);
});

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    username: String!
    token: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int
    books: [Book!]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int!): Author!
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args;
      let filteredBooks = await Book.find({});
      if (genre) filteredBooks = filteredBooks.filter((b) => b.genres.includes(genre));
      if (author) filteredBooks = filteredBooks.filter((b) => b.author === author);
      return filteredBooks;
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, { currentUser }) => currentUser,
  },
  Book: {
    author: async (root) => await Author.findById(root.author),
  },
  Author: {
    books: async (root) => await Book.find({ author: root.id }),
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id });
      return books.length;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("not authenticated");
      let authorObj = await Author.findOne({ name: args.author });
      if (!authorObj) {
        const newAuthor = new Author({ name: args.author });
        authorObj = await newAuthor.save().catch((err) => {
          throw new UserInputError(err.message, { invalidArgs: args });
        });
      }
      const newBook = new Book({ ...args, author: authorObj.id });
      return newBook.save().catch((err) => {
        throw new UserInputError(err.message, { invalidArgs: args });
      });
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("not authenticated");
      console.log(args);
      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      console.log(author);
      console.log(author._id.toString());
      const newAuthor = { born: args.setBornTo };
      console.log(newAuthor);
      const updatedAuthor = await Author.findByIdAndUpdate(author._id.toString(), newAuthor, { new: true, runValidators: true, context: "query" });
      console.log(updatedAuthor);
      return updatedAuthor;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });
      return user.save().catch((err) => {
        throw new UserInputError(err.message, { invalidArgs: args });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") throw new UserInputError("wrong credentials");
      const userForToken = { username: user.username, id: user._id };
      return { token: jwt.sign(userForToken, JWT_SECRET), username: user.username };
    },
  },
};

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
