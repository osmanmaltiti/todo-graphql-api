import { IContext } from '../graphql';
import { throwError } from '../helper/error-handling';

interface ICreateActivity {
  activitydata: {
    description: string;
    startTime: string;
    endTime: string;
    status: boolean;
    listId: string;
  };
}

export const createActivity = async (
  _: unknown,
  args: ICreateActivity,
  context: IContext
) => {
  const { description, startTime, endTime, status, listId } = args.activitydata;
  console.log({ description, startTime, endTime, status, listId });
  const { prisma } = context;

  try {
    const activity = await prisma.activities.create({
      data: {
        description,
        listId: Number(listId),
        startTime,
        endTime,
        status,
      },
    });

    return activity;
  } catch (error) {
    return throwError({
      error,
      errorMessage: 'User does not exist',
      defaultMessage: 'Activity creation error',
      params: args,
    });
  }
};

export const listActivities = async (
  parent: { id: string },
  args: { id: string },
  context: IContext
) => {
  const { id } = parent || args;
  const { prisma } = context;

  try {
    const activities = await prisma.activities.findMany({
      where: {
        listId: Number(id),
      },
    });

    return activities;
  } catch (error) {
    return throwError({
      error,
      errorMessage: 'ListId does not exist',
      params: id,
      defaultMessage: 'Activities fetch error',
    });
  }
};

export const getActivity = async (
  _: unknown,
  args: { id: string },
  context: IContext
) => {
  const { id } = args;
  const { prisma } = context;

  try {
    const activity = await prisma.activities.findUnique({
      where: {
        id,
      },
    });

    return activity;
  } catch (error) {
    return throwError({
      error,
      errorMessage: 'Activity with id does not exist',
      params: id,
      defaultMessage: 'Activities fetch error',
    });
  }
};

export const completeActivity = async (
  _: unknown,
  args: { id: string },
  context: IContext
) => {
  const { id } = args;
  const { prisma } = context;

  try {
    const activity = await prisma.activities.update({
      where: { id },
      data: { status: true },
    });

    return activity;
  } catch (error) {
    return throwError({
      error,
      errorMessage: 'Activity with id does not exist',
      params: args.id,
      defaultMessage: 'Complete activity error',
    });
  }
};

export const deleteActivity = async (
  _: unknown,
  args: { id: string },
  context: IContext
) => {
  const { id } = args;
  const { prisma } = context;

  try {
    const activity = await prisma.activities.delete({ where: { id } });

    if (activity) {
      const activities = await prisma.activities.findMany({
        where: { listId: activity.listId },
      });

      return activities;
    }
  } catch (error) {
    return throwError({
      error,
      errorMessage: 'Activity with id does not exist',
      params: args.id,
      defaultMessage: 'Delete activity error',
    });
  }
};
