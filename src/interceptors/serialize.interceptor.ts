import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';

interface ClassConstructor {
  new (...args: any[]): object;
}
// Serialize is a custom decorator that we can use to apply the SerializeInterceptor to a request handler
export function Serialize(dto: ClassConstructor) {
  // UseInterceptors is a built-in decorator provided by NestJS that we can use to apply an interceptor to a request handler
  return UseInterceptors(new SerializeInterceptor(dto));
}

// This is a custom interceptor that will be used to transform the response data to the specified DTO before sending it out to the client
// we don't need to add the @Injectable decorator because this class doesn't have any dependencies and it doesn't need to be injected into other classes
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(_context: ExecutionContext, handler: CallHandler) {
    // Run something before a request is handled by the request handler
    // console.log("I'm running before the handler", context);
    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        // console.log("I'm running before the response is sent out", data);
        return plainToInstance(this.dto, data, {
          // don't share the properties with the Exclude decorator only
          excludeExtraneousValues: false,
        });
      }),
    );
  }
}
