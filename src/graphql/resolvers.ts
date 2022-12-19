import {
  createActivity,
  getActivity,
  listActivities,
} from '../controllers/activity.controller';
import { createUser, getUser, listUsers } from '../controllers/user.controller';
import {
  createList,
  getList,
  getLists,
} from './../controllers/list.controller';

const resolvers = {
  Query: {
    getUser,
    listUsers,
    getLists,
    getList,
    listActivities,
    getActivity,
  },
  Mutation: {
    createUser,
    createList,
    createActivity,
  },
  User: {
    list: getLists,
  },
  List: {
    activities: listActivities,
  },
};

export default resolvers;
