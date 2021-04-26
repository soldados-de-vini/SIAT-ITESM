# Get User Professors

    GET professors/
    
Gets all the professors of the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

## Example
### Request

    GET https://[HOST]/professors

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Searched user data successfully."
    },
    "result": [
        {
            "id": "a20c8c96-73f1-4554-8313-0ae7fab639f2",
            "nomina": "L01234567",
            "name": "Professor 1",
            "area": [
                "Mate"
            ],
            "coordination": null,
            "email": "professor1@gmail.com",
            "loadLimit": 16
        },
        {
            "id": "08c283f7-7e81-49c7-98b1-c2ba0fe2db8b",
            "nomina": "L01234568",
            "name": "Professor 2",
            "area": [
                "Fisica",
                "Mate"
            ],
            "coordination": "example",
            "email": "professor2@gmail.com",
            "loadLimit": 16
        }
    ]
}
```
