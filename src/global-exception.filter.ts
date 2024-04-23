import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from './constants';
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      message = exception.message as string;
    }

    response.status(httpStatus).json({
      status: httpStatus,
      message,
      path: request.url,
      error: exception,
    });
  }
}
