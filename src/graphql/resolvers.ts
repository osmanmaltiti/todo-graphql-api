import {
  completeActivity,
  createActivity,
  deleteActivity,
  getActivity,
  listActivities,
} from '../controllers/activity.controller';
import { createUser, getUser, listUsers } from '../controllers/user.controller';
import {
  createList,
  getList,
  getLists,
  listCreated,
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
    completeActivity,
    deleteActivity,
  },
  Subscription: {
    listCreated: {
      subscribe: listCreated,
      resolve: (payload: any) => console.log(payload),
    },
  },
  User: {
    list: getLists,
  },
  List: {
    activities: listActivities,
  },
};

export default resolvers;
