const typeDefs = `
  type Query {
    listUsers: [User]
    getUser(id: String!): User
    getLists(id: String!): [List]
    getList(id: String!): List
    listActivities(id: String!): [Activity]
    getActivity(id: String!): Activity
  }

  type Mutation {
    createUser(userdata: UserInput!): User
    createList(listdata: ListInput!): List
    createActivity(activitydata: ActivityInput!): Activity
  }

  type User {
    id: String
    name: String!
    email: String!
    profile: String
    list: [List]
  }

  type List {
    id: String
    title: String
    user: User
    userId: String
    activities: [Activity]
  }

  type Activity {
    id: String 
    description: String
    status: Boolean
    list : List 
    listId: String
    startTime: String
    endTime: String
  }

  input UserInput {
    name: String!
    email: String!
    profile: String
    password: String!
  }

  input ListInput {
    title: String!
    userId: String!
  }

  input ActivityInput {
    description: String!
    startTime: String
    endTime: String
    status: Boolean
    listId: Int
  }
`;

export default typeDefs;
