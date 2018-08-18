const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Books by this author
    """
    books: [Book]
  }

  type Book {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    books: [Book]
    getBook(id: Int!): Book
    searchBooks(title: String!, orderBy: String, asc: Boolean, offset: Int, limit: Int): [Book]
    getAuthor(id: Int!): Author
    searchAuthors(name: String!, orderBy: String, asc: Boolean, offset: Int, limit: Int): [Author]
  }

  # this schema allows the following mutation:
  type Mutation {
    upvoteBook (
      bookId: Int!
    ): Book
  }
`;

module.exports = typeDefs;