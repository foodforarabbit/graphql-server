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
    getBook: (_, { id }) => find(books, { id }),
    author: (_, { id }) => find(authors, { id }),
  },
  
  Mutation: {
    upvoteBook: (_, { bookId }) => {
      const book = find(books, { id: bookId });
      if (!book) {
        throw new Error(`Couldn't find book with id ${bookId}`);
      }
      book.votes += 1;
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