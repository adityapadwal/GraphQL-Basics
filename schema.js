export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!] # Related data
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game! # Related data
    author: Author! # Related data
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!] # Related data
  }

  # Reading
  type Query {
    games: [Game]
    game(id: ID!): Game
    reviews: [Review]
    review(id: ID!): Review
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    deleteGame(id: ID!): [Game] # Deleting
    deleteAuthor(id: ID!): [Author]
    deleteReview(id: ID!): [Review]
    addGame(game: AddGameInput!): Game # Creating
    updateGame(id: ID!, edits: EditGameInput!): Game # Updating
  }

  input AddGameInput{
    title: String!,
    platform: [String!]!
  }

  input EditGameInput{
    title: String,
    platform: [String!]
  }
`