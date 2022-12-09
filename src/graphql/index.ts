import { Prisma, PrismaClient } from '@prisma/client';
import { createSchema, createYoga, YogaInitialContext } from 'graphql-yoga';
import resolvers from './resolvers';
import typeDefs from './type-defs';

export interface IContext {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  initialContext: YogaInitialContext;
}

const prisma = new PrismaClient();

const graphqlSchema = createSchema({ typeDefs, resolvers });

const graphqlServer = createYoga({
  schema: graphqlSchema,
  context: (initialContext) => ({
    initialContext,
    prisma,
  }),
});

export default graphqlServer;
