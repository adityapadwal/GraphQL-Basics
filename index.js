import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// data
import db from './_db.js'

// types
import { typeDefs } from './schema.js'

// resolvers
const resolvers = {

  // Handling related data (for nested data)
  Game: {
    reviews: (parent) => db.reviews.filter((e) => e.game_id === parent.id), 
  },
  Author: {
    reviews: (parent) => db.reviews.filter((e) => e.author_id === parent.id),
  },
  Review: {
    game: (review) => db.games.find((e) => e.id === review.game_id),
    author: (review) => db.authors.find((e) => e.id === review.author_id),
  },

  Query: {
    games() {
      return db.games
    },
    game(parent, args) {
      return db.games.find((game) => game.id === args.id)
    },
    authors() {
      return db.authors
    },
    author(parent, args) {
      return db.authors.find((author) => author.id === args.id)
    },
    reviews() {
      return db.reviews
    },
    review(parent, args) {
      return db.reviews.find((review) => review.id === args.id)
    }
  }
}

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
})

async function startServer() {
  let { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Server ready at: ${url}`);
}

startServer();