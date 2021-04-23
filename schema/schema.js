const { GraphQLString, GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList } = require("graphql");
const _ = require('lodash');


const authors = [
    { id: "1", name: 'author1', age: 20 },
    { id: "2", name: 'author2', age: 30 },
    { id: "3", name: 'author3', age: 40 }
];
const books = [
    { id: "1", name: 'book1', genre: 'genre1', authorId: '1' },
    { id: "2", name: 'book2', genre: 'genre2', authorId: '2' },
    { id: "3", name: 'book3', genre: 'genre3', authorId: '3' },
    { id: "4", name: 'book4', genre: 'genre4', authorId: '1' },
    { id: "5", name: 'book5', genre: 'genre5', authorId: '2' },
    { id: "6", name: 'book6', genre: 'genre6', authorId: '3' },
    { id: "7", name: 'book7', genre: 'genre7', authorId: '3' }
];
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId })
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: {
        'id': { type: GraphQLID },
        'name': { type: GraphQLString },
        'age': { type: GraphQLString },
        'books': {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        },

    },

});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID,
                }
            },
            resolve: (parent, args) => {
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});