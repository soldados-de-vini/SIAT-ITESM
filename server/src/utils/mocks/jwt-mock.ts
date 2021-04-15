const mockedJwtService = {
  sign: () => 'secret',
};

const jwtRequest = { user: { id: 'uuid' } };

export { mockedJwtService, jwtRequest };
