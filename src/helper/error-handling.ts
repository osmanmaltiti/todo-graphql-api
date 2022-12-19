import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { GraphQLError } from 'graphql';
interface IThrowError {
  error: unknown;
  errorMessage: string;
  defaultMessage: string;
  params?: any;
}

export const throwError = ({
  error,
  errorMessage,
  defaultMessage,
  params,
}: IThrowError): GraphQLError => {
  if (error instanceof PrismaClientKnownRequestError) {
    return new GraphQLError(`${errorMessage}: ${params}`);
  }

  return new GraphQLError(defaultMessage);
};
