import { HttpStatus } from '@nestjs/common';

const standardResponse = {
  status: {
    statusCode: HttpStatus.OK,
    message: 'Success.',
  },
};

export { standardResponse };
