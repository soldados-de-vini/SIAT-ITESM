# Get User Avenues

    GET avenues/
    
Gets all the Avenues of the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

## Example
### Request

    GET https://[HOST]/avenues

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Searched user data successfully."
    },
    "result": [
    {
      "id": "cf8f6a39-c22a-4efe-b727-a6aa21dc0ea0",
      "name": "IIT"
    },
    {
      "id": "8c2fbc50-f732-47c6-a3e0-3a532780a092",
      "name": "ICT"
    },
    {
      "id": "3726e1bb-4531-456d-b289-ed6fb111b59d",
      "name": "IBQ"
    },
    {
      "id": "92b9a748-9752-45df-87d1-539da2b87688",
      "name": "ICI"
    }
  ]
}
```
