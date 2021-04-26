# Get User Periods

    GET periods/
    
Gets all the periods of the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

## Example
### Request

    GET https://[HOST]/periods

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Searched user data successfully."
    },
    "result": [
        {
            "id": "b2e0c568-269b-4cf4-9515-93e70fba0330",
            "name": "Ago-Nov 2021",
            "startDate": "2021-07-25",
            "endDate": "2021-11-22",
            "vacations": [
                "2021-09-01"
            ]
        },
        {
            "id": "e7e0c135-74fe-431d-8694-b6a39c28c8de",
            "name": "Ago-Nov 2022",
            "startDate": "2022-07-25",
            "endDate": "2022-11-22",
            "vacations": [
                "2022-09-01"
            ]
        }
    ]
}
```
