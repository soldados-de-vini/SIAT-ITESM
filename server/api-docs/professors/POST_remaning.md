# POST Professors Available

    POST professors/remaining
    
Returns the professors that are available during the specified times and period.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

## Example
### Request

    POST https://[HOST]/professors/remaining

### Request Body
```json
{
    "periodId": "66195ba1-ca0e-4f29-9eb8-eb35ddf7c9ee",
    "events": [
        {
        "startTime": "13:00",
        "endTime": "15:00",
        "weekDay": 4
        }
    ]
}
```

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Searched successfully."
    },
    "result": [
        {
            "id": "4e8fcb5a-899a-4cf0-aa38-f53e70d21ea4",
            "nomina": "3M",
            "name": "Caressa",
            "area": [
                "matemáticas"
            ],
            "coordination": "Qingdao",
            "email": "l01234567@tec.mx",
            "loadLimit": 14
        }
    ]
}
```
