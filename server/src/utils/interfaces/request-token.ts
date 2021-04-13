/**
 * Represents the processed Jwt guarded request with user information.
 */
export interface JwtRequest {
  user: {
    id: string;
  };
}
