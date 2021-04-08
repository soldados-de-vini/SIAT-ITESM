import { HttpStatus } from '@nestjs/common';

export interface ResponseStatus {
  status: {
    statusCode: HttpStatus;
    message: string;
  };
  result?: any;
}
