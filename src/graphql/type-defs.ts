const typeDefs = `
  type Query {
    listUsers: [User]
    getUser(email: String!): User
  }

  type Mutation {
    createUser(userdata: UserInput!): User
  }

  type User {
    id: String
    name: String!
    email: String!
    profile: String
  }

  input UserInput {
    name: String!
    email: String!
    profile: String
  }
`;

export default typeDefs;
