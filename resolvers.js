const db = require('./data/db.js');
const { find, filter, orderBy: _orderBy } = require('lodash');

const singleOrArray = (val) => {
  return Array.isArray(val) ? val : [val];
}

const {
  books,
  authors,
} = db;

const resolvers = {
  Query: {
    books: () => books,
    searchBooks: (_, { title, orderBy, asc, offset = 0, limit = 10 }) => {
      return _orderBy(filter(books, (book) => book.title.toLowerCase().indexOf(title.toLowerCase()) !== -1), [...singleOrArray(orderBy)], [asc ? 'asc' : 'desc']).slice(offset, offset + limit)
    },
    searchAuthors: (_, { name, orderBy, asc, offset = 0, limit = 10 }) => {
      return _orderBy(filter(authors, (book) => `${book.firstName}${book.lastName}`.toLowerCase().indexOf(name.toLowerCase()) !== -1), [...singleOrArray(orderBy)], [asc ? 'asc' : 'desc']).slice(offset, offset + limit)
    },
    getBook: (_, { id }) => find(books, { id }),
    getAuthor: (_, { id }) => find(authors, { id }),
  },
  
  Mutation: {
    upvoteBook: (_, { id }) => {
      const book = find(books, { id });
      if (!book) {
        throw new Error(`Couldn't find book with id ${id}`);
      }
      book.votes += 1;
      return book;
    },
    downvoteBook: (_, { id }) => {
      const book = find(books, { id });
      if (!book) {
        throw new Error(`Couldn't find book with id ${id}`);
      }
      book.votes -= 1;
      return book;
    },
  },
  
  Author: {
    books: author => filter(books, { authorId: author.id }),
  },
  
  Book: {
    author: book => find(authors, { id: book.authorId }),
  },
};

module.exports = resolvers;