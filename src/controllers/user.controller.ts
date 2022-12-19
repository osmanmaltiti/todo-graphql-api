import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { GraphQLError } from 'graphql';
import { IContext } from '../graphql';

interface IUser {
  userdata: {
    name: string;
    email: string;
    profile: string;
    password: string;
  };
}

export const createUser = async (
  _: unknown,
  args: IUser,
  context: IContext
) => {
  const { name, email, profile, password } = args.userdata;
  const { prisma } = context;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        profile,
        password,
      },
    });

    return newUser;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return new GraphQLError(`User creation error: ${email} already exists`);
    }

    return new GraphQLError('User creation error');
  }
};

export const listUsers = async (
  _: unknown,
  args: unknown,
  context: IContext
) => {
  const { prisma } = context;

  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (
  _: unknown,
  args: { id: string },
  context: IContext
) => {
  const { prisma } = context;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: args.id,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return new GraphQLError(`User with id: ${args.id} does not exist`);
    }

    return new GraphQLError('User get error: unknown');
  }
};
