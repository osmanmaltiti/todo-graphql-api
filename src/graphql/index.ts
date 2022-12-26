import { Prisma, PrismaClient } from '@prisma/client';
import {
  createPubSub,
  createSchema,
  createYoga,
  PubSub,
  YogaInitialContext,
} from 'graphql-yoga';
import resolvers from './resolvers';
import typeDefs from './type-defs';

export interface IContext {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  initialContext: YogaInitialContext;
  pubSub: PubSub<{
    listCreated: [listCreated: string];
  }>;
}

const prisma = new PrismaClient();

const graphqlSchema = createSchema({ typeDefs, resolvers });

const pubSub = createPubSub<{
  listCreated: [listCreated: string];
}>();

const graphqlServer = createYoga({
  schema: graphqlSchema,
  context: (initialContext) => ({
    initialContext,
    prisma,
    pubSub,
  }),
});

export default graphqlServer;
