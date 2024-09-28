import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoServerError } from 'mongodb';

// catch all types of exceptions
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = getResponseMessage(exception as Error);

    // Log exception
    console.error(`[${new Date().toISOString()}] ${status} - ${message}`);

    // Send error response
    response.status(status).json({
      success: false,
      //timestamp: new Date().toISOString(),
      //path: request.url,
      message,
    });
  }
}

function getResponseMessage(exception: Error) {
  let msg: string | object = '';
  if (exception instanceof HttpException) {
    const res = exception.getResponse();
    console.log('res', res);
    msg =
      Array.isArray(res['message']) && res['message'][0]
        ? res['message'][0]
        : res['message'] || res;
  } else if (
    exception instanceof MongoServerError &&
    exception.code === 11000
  ) {
    // duplicate key error
    const field = Object.entries(exception.keyValue)[0][0].replace('_', ' '); // field
    const fieldValue = Object.entries(exception.keyValue)[0][1]; // value
    msg = `${field}: '${fieldValue}' already exists`;
  } else {
    msg = exception.message;
  }
  return msg;
}
