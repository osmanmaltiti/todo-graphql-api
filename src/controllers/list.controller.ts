import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { GraphQLError } from 'graphql';
import { IContext } from '../graphql';

interface INewList {
  listdata: {
    title: string;
    userId: string;
  };
}

// CREATE LIST
export const createList = async (
  _: unknown,
  args: INewList,
  context: IContext
) => {
  const { title, userId } = args.listdata;
  const { prisma } = context;

  try {
    const list = await prisma.list.create({
      data: {
        title,
        userId,
      },
    });

    return list;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new GraphQLError(`List creation error: ${error.message}`);
    }

    return new GraphQLError('List creation error: unknown');
  }
};

// GET ALL USER'S LISTS
export const getLists = async (
  parent: { id: string },
  args: { id: string },
  context: IContext
) => {
  const { id } = parent || args;
  const { prisma } = context;

  try {
    const lists = await prisma.list.findMany({
      where: {
        userId: id,
      },
    });

    return lists;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return new GraphQLError(`Lists for user: ${parent.id} do not exist`);
    }

    return new GraphQLError('List get error: unknown');
  }
};

// GET ONE LIST
export const getList = async (
  parent: { id: string },
  args: { id: string },
  context: IContext
) => {
  const { id } = args;
  const { prisma } = context;

  try {
    const list = await prisma.list.findFirst({
      where: {
        id: Number(id),
      },
    });

    return list;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return new GraphQLError(`Lists for user: ${parent.id} do not exist`);
    }

    return new GraphQLError('List get error: unknown');
  }
};
