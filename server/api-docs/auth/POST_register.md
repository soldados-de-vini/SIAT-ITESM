# Create User

    POST auth/register
    
Registers a new user on the database and returns the user info with it's uuid.

## Parameters

### Body Parameters
Field | Data Type | Required | Description
--- | --- | --- | ---
email | string | [X] | The email used by the user.
name | string | [X] | The full name of the user.
nomina | string |  [X] | The id of the professor. E.g. L0123456
password | string | [X] | The password to access the system via login.

## Example
### Request

    POST https://[HOST]/auth/register

#### Request Body    
```json
{
  "email": "test@gmail.com",
  "name": "Test Guy",
  "nomina": "L0123456",
  "password": "pass123"
}
```

### Response
``` json
{
  "status": {
    "status_code": 200,
    "message": "Successfully registered"
  },
  "result": {
    "id": "9657c175-72cf-4924-aaab-4f09c89d323e",
    "email": "test1@gmail.com",
    "nomina": "L01237830",
    "name": "Test 1"
  }
}
```