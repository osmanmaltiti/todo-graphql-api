import { createUser, getUser, listUsers } from '../controllers/user.controller';

const resolvers = {
  Query: {
    getUser,
    listUsers,
  },
  Mutation: {
    createUser,
  },
};

export default resolvers;
