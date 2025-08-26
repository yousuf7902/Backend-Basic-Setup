import * as statusCodes from '../constants/httpCodes';

export interface Response<T> {
  statusCode: number;
  message: string;
  data?: T | T[];
  error?: string;
  count?: number;
}

export const sendResponse = <T = any>(option : Partial<Response<T>>): Response<T> => {
  return {
    statusCode: option.statusCode || statusCodes.SUCCESS,
    message: option.message || 'Success',
    data: option.data || [],
    error: option.error,
    count: option.count,
  };
};

export const success = <T = any>(data: T | T[]): Response<T> => {
  return {
    statusCode: statusCodes.SUCCESS,
    message: 'Success',
    data,
  };
};

export const created = <T = any>(data: T | T[]): Response<T> => {
  return {
    statusCode: statusCodes.CREATED,
    message: 'Created successfully',
    data,
  };
};

export const error = (statusCode: number, message: string, error?: string) : Response<null> => {
  return {
    statusCode,
    message,
    error,
  };
}



