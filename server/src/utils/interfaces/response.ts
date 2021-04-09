import { HttpStatus } from '@nestjs/common';

/**
 * Definition of every response given back to the user by the API.
 */
export interface ResponseStatus {
  status: {
    statusCode: HttpStatus;
    message: string;
  };
  result?: any;
}
