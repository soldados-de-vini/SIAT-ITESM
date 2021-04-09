# Login User

    POST auth/login
    
Generates a JWT token for the user to use to have access to user protected endpoints.

## Parameters

### Body Parameters
Field | Data Type | Required | Description
--- | --- | --- | ---
email | string | [X] | The email used by the user.
password | string | [X] | The password to access the system via login.

## Example
### Request

    POST https://[HOST]/auth/login

#### Request Body    
```json
{
  "email": "test@gmail.com",
  "password": "pass123"
}
```

### Response
``` json
{
  "status": {
    "statusCode": 202,
    "message": "Successful login"
  },
  "result": {
    "access_token": "token"
  }
}
```