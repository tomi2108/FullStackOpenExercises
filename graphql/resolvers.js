const { UserInputError, AuthenticationError } = require("apollo-server");
const Book = require("./models/Book");
const User = require("./models/User");
const Author = require("./models/Author");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "THIS_IS_A_SECRET_WORD";

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

module.exports = resolvers;
